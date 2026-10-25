// node --test test/  — checks.mjs rule cases, then the hook and CI modes end to end in throwaway git repos.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findings } from '../scripts/checks.mjs';
import { compare, readBaseline, resolveDeps, wcagOf } from '../scripts/render.mjs';
import { hookReason, loadConfig, unquote, verdict } from '../scripts/run.mjs';

const RUN = join(dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'run.mjs');
const rules = (file, text) => findings(file, text, null).filter((f) => !f.overridden).map((f) => f.rule);

const CASES = [
  // [file, markup, expected rules]
  ['a.html', '<img src="x.png">', ['img-alt']],
  ['a.html', '<img src="x.png" alt="">', []],
  ['a.jsx', '<img src={src} {...props} />', []],
  ['a.html', '<img src="x.png" aria-hidden="true">', []],
  ['a.html', '<html><body></body></html>', ['html-lang']],
  ['a.html', '<html lang="fi"><body></body></html>', []],
  ['a.jsx', '<html><body/></html>', []],
  ['a.html', '<button><svg viewBox="0 0 1 1"></svg></button>', ['button-name']],
  ['a.html', '<button>Save</button>', []],
  ['a.html', '<button aria-label="Close"><svg></svg></button>', []],
  ['a.tsx', '<button onClick={go}>{label}</button>', []],
  ['a.tsx', '<button><Icon name="x" /></button>', []],
  ['a.html', '<button><img src="i.png" alt="Search"></button>', []],
  ['a.html', '<a href="/x"></a>', ['link-name']],
  ['a.html', '<a name="top"></a>', []],
  ['a.html', '<a href="/x"><span class="sr-only">Home</span></a>', []],
  ['a.html', '<input type="text" placeholder="Name">', ['input-label']],
  ['a.html', '<label>Name <input type="text"></label>', []],
  ['a.html', '<label for="n">Name</label><input id="n">', []],
  ['a.jsx', '<label htmlFor="n">Name</label><input id="n" />', []],
  ['a.html', '<input type="hidden" name="t">', []],
  ['a.html', '<input type="submit" value="Go">', []],
  ['a.jsx', '<input type={kind} />', []],
  ['a.html', '<select><option>1</option></select>', ['input-label']],
  ['a.html', '<div tabindex="3">x</div>', ['tabindex-positive']],
  ['a.html', '<div tabindex="0">x</div>', []],
  ['a.jsx', '<div onClick={open}>Open</div>', ['click-keyboard']],
  ['a.jsx', '<div role="button" tabIndex={0} onClick={open} onKeyDown={k}>Open</div>', []],
  ['a.vue', '<div @click="open">Open</div>', ['click-keyboard']],
  ['a.html', '<meta name="viewport" content="width=device-width, user-scalable=no">', ['viewport-zoom']],
  ['a.html', '<meta name="viewport" content="width=device-width, initial-scale=1">', []],
  ['a.css', 'button:focus { outline: none; }', ['focus-outline']],
  ['a.css', 'button:focus { outline: none; box-shadow: 0 0 0 2px blue; }', []],
  ['a.css', 'button:focus:not(:focus-visible) { outline: none; }', []],
  ['a.css', 'button:focus-visible { outline: none; }', []],
  ['a.jsx', '<A href="/x"></A>', []],
  ['a.jsx', '<img alt={x > 1 ? "a" : "b"} src="y" />', []],
  ['a.md', '<img src="x">', []],
];

for (const [file, text, want] of CASES) {
  test(`${file}: ${text}`, () => assert.deepEqual(rules(file, text), want));
}

test('inline override marks the finding, on the line or the one before', () => {
  const [a] = findings('a.html', '<img src="x"> <!-- design-gate-ignore: decorative, alt comes from CMS -->', null);
  assert.equal(a.overridden, 'decorative, alt comes from CMS');
  const [b] = findings('a.jsx', '{/* design-gate-ignore: tracked in #12 */}\n<img src="x" />', null);
  assert.equal(b.overridden, 'tracked in #12');
});

test('only added lines are judged', () => {
  const text = '<img src="old">\n<img src="new">\n';
  assert.deepEqual(findings('a.html', text, new Set([2])).map((f) => f.line), [2]);
  assert.deepEqual(findings('a.html', text, new Set([])), []);
});

test('axe tags map to success criterion and level', () => {
  assert.deepEqual(wcagOf(['cat.color', 'wcag2aa', 'wcag143']), { wcag: '1.4.3', level: 'AA' });
  assert.deepEqual(wcagOf(['wcag2a', 'wcag111']), { wcag: '1.1.1', level: 'A' });
});

test('baseline: first CI run is advisory, later runs block only new issues', () => {
  const f = (k) => ({ key: k });
  assert.deepEqual(compare([f('a')], null, { update: false }).advisoryAll.length, 1);
  const r = compare([f('a'), f('b')], new Set(['a']), { update: false });
  assert.deepEqual(r.fresh.map((x) => x.key), ['b']);
  assert.equal(r.carried, 1);
});

test('baseline: a local first run records it once and says so', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dg-bl-'));
  try {
    assert.equal(compare([{ key: 'a' }], null, { update: true, cwd: dir }).created, true);
    assert.equal(compare([{ key: 'a' }], new Set(['a']), { update: true, cwd: dir }).created, false);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('rendered deps: missing axe-core means no deps, not a half-set', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dg-deps-'));
  try {
    writeFileSync(join(dir, 'package.json'), '{}');
    mkdirSync(join(dir, 'node_modules', 'playwright-core'), { recursive: true });
    writeFileSync(join(dir, 'node_modules', 'playwright-core', 'package.json'), '{"name":"playwright-core","main":"i.js"}');
    writeFileSync(join(dir, 'node_modules', 'playwright-core', 'i.js'), '');
    assert.equal(resolveDeps(dir, {}), null);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('hook reason: lists at most 12 failures and counts the rest', () => {
  const block = Array.from({ length: 14 }, (_, i) => ({ file: 'a.html', line: i + 1, rule: 'img-alt', wcag: '1.1.1', level: 'A', msg: 'm', fix: 'f' }));
  const text = hookReason({ block }, 'A');
  assert.match(text, /14 new WCAG A failures/);
  assert.match(text, /and 2 more/);
  assert.doesNotMatch(text, /a.html:13 /);
  assert.doesNotMatch(hookReason({ block: block.slice(0, 12) }, 'A'), /more of the same/);
});

// --- end to end ---

function repo(files = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'dg-'));
  const g = (...a) => execFileSync('git', a, { cwd: dir, stdio: 'ignore' });
  g('init', '-q', '-b', 'main');
  g('config', 'user.email', 't@localhost'); g('config', 'user.name', 't'); g('config', 'commit.gpgsign', 'false');
  write(dir, { 'README.md': 'x\n', ...files });
  g('add', '-A'); g('commit', '-qm', 'base');
  return { dir, g };
}
function write(dir, files) {
  for (const [p, c] of Object.entries(files)) { mkdirSync(dirname(join(dir, p)), { recursive: true }); writeFileSync(join(dir, p), c); }
}
let n = 0;
function hook(dir, cmd, env = {}, session = `s${++n}`) {
  const r = spawnSync(process.execPath, [RUN, cmd], { input: JSON.stringify({ cwd: dir, session_id: session, source: 'startup', hook_event_name: cmd }),
    encoding: 'utf8', env: { ...process.env, DESIGN_GATE: '', ...env } });
  assert.equal(r.status, 0, r.stderr);
  return r.stdout ? JSON.parse(r.stdout) : {};
}
function session(dir) {
  const id = `s${++n}`;
  hook(dir, 'session-start', {}, id);
  return (env) => hook(dir, 'stop', env, id);
}

test('SKIPPED: no UI change says nothing', () => {
  const { dir } = repo();
  const stop = session(dir);
  write(dir, { 'lib.py': 'print(1)\n' });
  assert.deepEqual(stop(), {});
  rmSync(dir, { recursive: true, force: true });
});

test('FAIL blocks with a fix list, then PASS once fixed', () => {
  const { dir } = repo();
  const stop = session(dir);
  write(dir, { 'src/App.jsx': 'export default () => <div onClick={go}><img src="a.png" /></div>;\n' });
  const out = stop();
  assert.equal(out.decision, 'block');
  assert.match(out.reason, /img-alt/);
  assert.match(out.reason, /click-keyboard/);
  assert.match(out.reason, /src\/App\.jsx:1/);
  write(dir, { 'src/App.jsx': 'export default () => <button onClick={go}><img src="a.png" alt="Open" /></button>;\n' });
  assert.match(stop().systemMessage, /^design gate: PASS/);
  rmSync(dir, { recursive: true, force: true });
});

test('old debt in a touched file does not block; the new line does', () => {
  const { dir } = repo({ 'index.html': '<html lang="en">\n<img src="old.png">\n</html>\n' });
  const stop = session(dir);
  write(dir, { 'index.html': '<html lang="en">\n<img src="old.png">\n<p>new text</p>\n</html>\n' });
  assert.match(stop().systemMessage, /PASS/);
  write(dir, { 'index.html': '<html lang="en">\n<img src="old.png">\n<p>new text</p>\n<img src="new.png">\n</html>\n' });
  const out = stop();
  assert.equal(out.decision, 'block');
  assert.match(out.reason, /index\.html:4/);
  assert.doesNotMatch(out.reason, /index\.html:2/);
  rmSync(dir, { recursive: true, force: true });
});

test('changes committed during the session still count', () => {
  const { dir, g } = repo();
  const stop = session(dir);
  write(dir, { 'a.html': '<a href="/"></a>\n' });
  g('add', '-A'); g('commit', '-qm', 'agent commit');
  assert.equal(stop().decision, 'block');
  rmSync(dir, { recursive: true, force: true });
});

test('after two blocks the turn ends with FAIL said once, not a loop', () => {
  const { dir } = repo();
  const stop = session(dir);
  write(dir, { 'a.html': '<button></button>\n' });
  assert.equal(stop().decision, 'block');
  assert.equal(stop().decision, 'block');
  const third = stop();
  assert.equal(third.decision, undefined);
  assert.match(third.systemMessage, /FAIL left open after 2 attempts/);
  rmSync(dir, { recursive: true, force: true });
});

test('OVERRIDDEN: inline ignore passes and is reported', () => {
  const { dir } = repo();
  const stop = session(dir);
  write(dir, { 'a.html': '<img src="x.png"><!-- design-gate-ignore: spacer from legacy CMS -->\n' });
  assert.match(stop().systemMessage, /^design gate: OVERRIDDEN.*1 overridden/);
  rmSync(dir, { recursive: true, force: true });
});

test('OVERRIDDEN: DESIGN_GATE=off skips the check and says so', () => {
  const { dir } = repo();
  const stop = session(dir);
  write(dir, { 'a.html': '<button></button>\n' });
  assert.match(stop({ DESIGN_GATE: 'off' }).systemMessage, /OVERRIDDEN \(DESIGN_GATE=off, logged in .*override\.log\)/);
  rmSync(dir, { recursive: true, force: true });
});

test('UNJUDGED: no git repo is said once and never blocks', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dg-nogit-'));
  write(dir, { 'a.html': '<button></button>\n' });
  const stop = session(dir);
  assert.match(stop().systemMessage, /UNJUDGED.*git/);
  assert.deepEqual(stop(), {});
  rmSync(dir, { recursive: true, force: true });
});

test('UNJUDGED: broken config never blocks', () => {
  const { dir } = repo();
  const stop = session(dir);
  write(dir, { '.design-gate.json': '{ nope', 'a.html': '<button></button>\n' });
  assert.match(stop().systemMessage, /UNJUDGED.*not valid JSON/);
  rmSync(dir, { recursive: true, force: true });
});

test('UNJUDGED: rendered check with no server does not block a clean change', () => {
  const { dir } = repo();
  const stop = session(dir);
  write(dir, { '.design-gate.json': JSON.stringify({ urls: ['http://127.0.0.1:9/'] }), 'a.html': '<html lang="en"><p>hi</p></html>\n' });
  const out = stop();
  assert.equal(out.decision, undefined);
  assert.match(out.systemMessage, /PASS.*rendered check not run/);
  rmSync(dir, { recursive: true, force: true });
});

test('paths with spaces, accents and quotes are read, tracked or new', () => {
  const { dir, g } = repo({ 'a b.html': '<p>x</p>\n', 'café.html': '<p>x</p>\n' });
  const stop = session(dir);
  write(dir, { 'a b.html': '<p>x</p>\n<img src="1.png">\n', 'café.html': '<p>x</p>\n<img src="2.png">\n', 'new ö.html': '<img src="3.png">\n' });
  const out = stop();
  assert.equal(out.decision, 'block');
  for (const f of ['a b.html:2', 'café.html:2', 'new ö.html:1']) assert.ok(out.reason.includes(f), `${f} missing:\n${out.reason}`);
  assert.equal(unquote('"b/a\\"q\\303\\251.html"'), 'b/a"qé.html');
  assert.equal(unquote('b/plain.html'), 'b/plain.html');
  rmSync(dir, { recursive: true, force: true });
});

test('a repo with no commit at session start: everything written counts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dg-empty-'));
  execFileSync('git', ['init', '-q'], { cwd: dir });
  const stop = session(dir);
  write(dir, { 'a.html': '<button></button>\n' });
  assert.equal(stop().decision, 'block');
  rmSync(dir, { recursive: true, force: true });
});

test('start commit rewritten (amend): said, and still judged from the new commit', () => {
  const { dir, g } = repo();
  const stop = session(dir);
  write(dir, { 'README.md': 'y\n' });
  g('commit', '-qa', '--amend', '-m', 'rewritten');
  g('reflog', 'expire', '--expire=now', '--all'); g('gc', '-q', '--prune=now');
  write(dir, { 'a.html': '<html lang="en"><p>ok</p></html>\n' });
  assert.match(stop().systemMessage, /PASS.*started from is gone/);
  write(dir, { 'a.html': '<html lang="en"><p>ok</p><button></button></html>\n' });
  assert.equal(stop().decision, 'block');
  rmSync(dir, { recursive: true, force: true });
});

test('no session start recorded: says the scope is since the last commit, once', () => {
  const { dir } = repo();
  write(dir, { 'a.html': '<html lang="en"><p>ok</p></html>\n' });
  const id = `nostart${++n}`;
  assert.match(hook(dir, 'stop', {}, id).systemMessage, /PASS.*no session start was recorded/);
  assert.doesNotMatch(hook(dir, 'stop', {}, id).systemMessage, /no session start/);
  rmSync(dir, { recursive: true, force: true });
});

test('unreadable hook input is UNJUDGED, not a silent pass', () => {
  const r = spawnSync(process.execPath, [RUN, 'stop'], { input: '{not json', encoding: 'utf8' });
  assert.equal(r.status, 0);
  assert.match(JSON.parse(r.stdout).systemMessage, /UNJUDGED.*could not read/);
});

test('config typos are UNJUDGED, never a narrower check', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dg-cfg-'));
  try {
    for (const [cfg, msg] of [[{ level: 'aa' }, /"level" must be/], [{ urls: 'http://x/' }, /"urls" must be a list/],
      [{ ignore: 'x' }, /"ignore" must be a list/], [{ maxBlocks: 'two' }, /"maxBlocks"/], [[1], /must be an object/]]) {
      writeFileSync(join(dir, '.design-gate.json'), JSON.stringify(cfg));
      assert.match(loadConfig(dir).error, msg);
    }
    writeFileSync(join(dir, '.design-gate.json'), JSON.stringify({ maxBlocks: -1 }));
    assert.match(loadConfig(dir).error, /"maxBlocks"/);
    writeFileSync(join(dir, '.design-gate.json'), JSON.stringify({ level: 'AA', urls: ['http://x/'], maxBlocks: 0 }));
    assert.equal(loadConfig(dir).error, undefined);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('verdict: an overridden failure is counted once, not also as advisory', () => {
  const v = verdict({ files: ['a.html'], found: [{ level: 'A', rule: 'img-alt', overridden: 'kept' }], render: null, level: 'A' });
  assert.deepEqual([v.state, v.overridden.length, v.advisory.length], ['OVERRIDDEN', 1, 0]);
});

test('baseline: CI never rewrites it, even when issues were fixed', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dg-ci-bl-'));
  try {
    compare([], new Set(['gone|u|t']), { update: false, cwd: dir });
    assert.equal(readBaseline(dir), null);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('an unreadable baseline is an error, a missing one is null', () => {
  const dir = mkdtempSync(join(tmpdir(), 'dg-blr-'));
  try {
    assert.equal(readBaseline(dir), null);
    mkdirSync(join(dir, '.design-gate'));
    writeFileSync(join(dir, '.design-gate', 'baseline.json'), '<<<<<<< HEAD\n{"keys": []}\n');
    assert.throws(() => readBaseline(dir), /cannot be read/);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('template syntaxes: bound and shorthand attributes, PHP and filled text are not failures', () => {
  const ok = {
    'a.vue': ['<img :src="s" :alt="t">', '<button :aria-label="l"><svg/></button>', '<label :for="u">N</label><input :id="u">',
      '<button v-text="l"></button>', '<a href="/" v-html="h"></a>', '<img v-bind:alt="t">', '<img-gallery></img-gallery>',
      '<input-number v-model="x"/>', '<div-card @click="x">y</div-card>'],
    'a.svelte': ['<img {src} {alt}>', '<label for="q">Q</label><input {id}>'],
    'a.php': ['<button><?= $label ?></button>', '<a href="/"><?php echo $t; ?></a>'],
    'a.css': ['a:focus{outline:0.5px solid red}', 'button:focus{outline:none} button:focus-visible{outline:2px solid red}'],
  };
  for (const [file, snippets] of Object.entries(ok)) for (const s of snippets) assert.deepEqual(findings(file, s, null), [], `${file}: ${s}`);
  assert.equal(findings('a.vue', '<img :src="s">', null)[0].rule, 'img-alt');
  assert.equal(findings('a.css', 'a:focus{outline:0}', null)[0].rule, 'focus-outline');
  assert.equal(findings('a.css', 'a:focus{outline:none} a:focus-visible{outline:none}', null)[0].rule, 'focus-outline');
});

test('an ignore comment covers its own line and the line below, never the line above', () => {
  const r = findings('a.html', '<img src=a>\n<img src=b> <!-- design-gate-ignore: x -->\n<img src=c>\n', null);
  assert.deepEqual(r.map((f) => [f.line, !!f.overridden]), [[1, false], [2, true], [3, true]]);
  const js = findings('a.jsx', '// design-gate-ignore: from the CMS\n<img src={a} />\nconst x = 1;\n', null);
  assert.equal(js[0].overridden, 'from the CMS');
});

test('a session in a subfolder of the repository still reads the files', () => {
  const { dir } = repo({ 'web/x.txt': 'x\n' });
  const id = `sub${++n}`;
  hook(join(dir, 'web'), 'session-start', {}, id);
  write(dir, { 'web/src/a.html': '<img src="a.png">\n' });
  const out = hook(join(dir, 'web'), 'stop', {}, id);
  assert.equal(out.decision, 'block');
  assert.match(out.reason, /web\/src\/a\.html:1/);
  rmSync(dir, { recursive: true, force: true });
});

test('ignore globs and build folders are skipped', () => {
  const { dir } = repo();
  const stop = session(dir);
  write(dir, { '.design-gate.json': JSON.stringify({ ignore: ['legacy/**'] }), 'legacy/old.html': '<button></button>\n', 'dist/b.html': '<button></button>\n' });
  assert.deepEqual(stop(), {});
  rmSync(dir, { recursive: true, force: true });
});

test('ci mode: exit 1 and a markdown report on FAIL, 0 on PASS', () => {
  const { dir, g } = repo();
  g('checkout', '-qb', 'feature');
  write(dir, { 'a.html': '<html lang="en"><a href="/"></a></html>\n' });
  g('add', '-A'); g('commit', '-qm', 'pr');
  const report = join(dir, 'report.md');
  let r = spawnSync(process.execPath, [RUN, 'ci', '--base', 'main', '--report', report], { cwd: dir, encoding: 'utf8' });
  assert.equal(r.status, 1);
  assert.match(r.stdout, /<!-- design-gate -->/);
  assert.match(r.stdout, /FAIL · 1 blocking/);
  assert.match(r.stdout, /\| `a\.html:1` \| link-name/);
  write(dir, { 'a.html': '<html lang="en"><a href="/">Home</a></html>\n' });
  g('add', '-A'); g('commit', '-qm', 'fix');
  r = spawnSync(process.execPath, [RUN, 'ci', '--base', 'main'], { cwd: dir, encoding: 'utf8' });
  assert.equal(r.status, 0);
  assert.match(r.stdout, /PASS · 0 blocking/);
  rmSync(dir, { recursive: true, force: true });
});

test('ci mode: a base it cannot find or a bad config writes an UNJUDGED report and exits 0', () => {
  const { dir } = repo();
  const report = join(dir, 'report.md');
  let r = spawnSync(process.execPath, [RUN, 'ci', '--base', '0000000000000000000000000000000000000000', '--report', report], { cwd: dir, encoding: 'utf8' });
  assert.equal(r.status, 0);
  assert.match(readFileSync(report, 'utf8'), /^<!-- design-gate -->\n\*\*design gate [\d.]+: UNJUDGED\*\*[\s\S]*fetch-depth: 0/);
  write(dir, { '.design-gate.json': '{"level": "aa"}' });
  r = spawnSync(process.execPath, [RUN, 'ci', '--base', 'HEAD', '--report', report], { cwd: dir, encoding: 'utf8' });
  assert.equal(r.status, 0);
  assert.match(readFileSync(report, 'utf8'), /UNJUDGED[\s\S]*"level" must be/);
  rmSync(dir, { recursive: true, force: true });
});

// Real browser + axe-core. Runs when DESIGN_GATE_DEPS points at a folder with playwright-core and axe-core installed.
test('rendered: first run records a baseline, a new issue then blocks', { skip: !process.env.DESIGN_GATE_DEPS && 'set DESIGN_GATE_DEPS to run' }, async () => {
  const http = await import('node:http');
  let body = '<!doctype html><html lang="en"><title>t</title><main><p style="color:#777;background:#888">old low contrast</p></main></html>';
  let status = 200;
  const server = http.createServer((_, res) => { res.writeHead(status, { 'content-type': 'text/html' }); res.end(body); });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const url = `http://127.0.0.1:${server.address().port}/`;
  const { dir } = repo({ '.design-gate.json': JSON.stringify({ urls: [url] }) });
  const stop = async () => {
    const { spawn } = await import('node:child_process');
    return new Promise((res) => {
      const p = spawn(process.execPath, [RUN, 'stop'], { env: process.env });
      let out = '';
      p.stdout.on('data', (d) => { out += d; });
      p.on('close', () => res(out ? JSON.parse(out) : {}));
      p.stdin.end(JSON.stringify({ cwd: dir, session_id: 'render1' }));
    });
  };
  try {
    hook(dir, 'session-start', {}, 'render1');
    write(dir, { 'page.html': '<html lang="en"><img src="a.png"></html>\n' });
    let out = await stop();
    assert.equal(out.decision, 'block', JSON.stringify(out));
    assert.throws(() => readFileSync(join(dir, '.design-gate', 'baseline.json')), /ENOENT/, 'a FAIL turn records no baseline');
    write(dir, { 'page.html': '<html lang="en"><p>x</p></html>\n' });
    out = await stop();
    assert.match(out.systemMessage, /PASS.*rendered baseline recorded: 1 issue/, JSON.stringify(out));
    body = body.replace('</main>', '<button style="color:#999;background:#aaa">new</button><img src="x.png"></main>');
    out = await stop();
    assert.equal(out.decision, 'block', JSON.stringify(out));
    assert.match(out.reason, /axe:image-alt/);
    assert.doesNotMatch(out.reason, /old low contrast/);
    status = 404;
    out = await stop();
    assert.match(out.systemMessage || '', /rendered check not run: .*HTTP 404/, JSON.stringify(out));
  } finally {
    server.closeAllConnections(); server.close();
    rmSync(dir, { recursive: true, force: true });
  }
});
