#!/usr/bin/env node
// design gate: blocks an agent's "done" while the UI it just wrote fails WCAG A, and reports the same verdict on a PR.
//   node run.mjs session-start          SessionStart hook: remembers HEAD so the gate knows what this session changed
//   node run.mjs stop                   Stop hook: PASS / FAIL / SKIPPED / UNJUDGED / OVERRIDDEN
//   node run.mjs ci --base <ref> [--report file.md]   GitHub Action: exit 1 on FAIL, markdown report for the PR comment
// States never block on the gate's own trouble: anything it could not judge is UNJUDGED, said once, and the turn ends.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findings, MARKUP, STYLE } from './checks.mjs';
import { rendered } from './render.mjs';

export const VERSION = '0.1.0';
const MAX_BLOCKS = 2;
const UI = (f) => MARKUP.test(f) || STYLE.test(f);
const SKIP_DIR = /(^|\/)(node_modules|dist|build|out|\.next|\.svelte-kit|vendor|coverage|\.git)\//;

const EMPTY_TREE = '4b825dc642cb6eb9a060e54bf8d69288fbee4904';
const git = (cwd, args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 << 20 });
const tryGit = (cwd, args) => { try { return git(cwd, args); } catch { return null; } };
// git's own words when a command fails, for the UNJUDGED line.
const gitWhy = (e) => e.code === 'ENOENT' ? 'git is not installed or not on PATH' : String(e.stderr || e.message).trim().split('\n')[0].slice(0, 160);

// git quotes a path holding a quote, a backslash or a control byte C-style ("a\"b.html"); this undoes it.
export function unquote(p) {
  if (!p.startsWith('"')) return p;
  const esc = { n: 10, t: 9, r: 13, a: 7, b: 8, f: 12, v: 11 };
  const chars = Array.from(p.slice(1, -1)), bytes = [];
  for (let i = 0; i < chars.length; i++) {
    const oct = chars[i] === '\\' && /^[0-7]{3}$/.test(chars.slice(i + 1, i + 4).join('')) ? chars.slice(i + 1, i + 4).join('') : null;
    if (oct) { bytes.push(parseInt(oct, 8)); i += 3; } else if (chars[i] === '\\') { const c = chars[++i]; bytes.push(...(c in esc ? [esc[c]] : Buffer.from(c))); } else bytes.push(...Buffer.from(chars[i]));
  }
  return Buffer.from(bytes).toString('utf8');
}

export function loadConfig(cwd) {
  const p = join(cwd, '.design-gate.json');
  const base = { level: 'A', urls: [], ignore: [], maxBlocks: MAX_BLOCKS };
  if (!existsSync(p)) return base;
  let own;
  try {
    own = JSON.parse(readFileSync(p, 'utf8'));
  } catch (e) {
    return { ...base, error: `.design-gate.json is not valid JSON (${e.message.split('\n')[0]})` };
  }
  const bad = configProblem(own);
  return bad ? { ...base, error: `.design-gate.json: ${bad}` } : { ...base, ...own };
}

// A typo must not quietly narrow the check ("aa" read as A, a url string read letter by letter), so it is UNJUDGED.
function configProblem(c) {
  if (!c || typeof c !== 'object' || Array.isArray(c)) return 'it must be an object like {"level": "A"}';
  if ('level' in c && c.level !== 'A' && c.level !== 'AA') return `"level" must be "A" or "AA", not ${JSON.stringify(c.level)}`;
  for (const k of ['urls', 'ignore']) if (k in c && !(Array.isArray(c[k]) && c[k].every((x) => typeof x === 'string'))) return `"${k}" must be a list of strings`;
  if ('maxBlocks' in c && !(Number.isInteger(c.maxBlocks) && c.maxBlocks >= 0)) return '"maxBlocks" must be a whole number';
  return null;
}

// Lines each file gained since `base` (a commit or tree), including uncommitted edits; untracked files count as
// all-new (null). { error } when git cannot say, so a failed diff is never read as "nothing changed".
export function changes(cwd, base) {
  let diff, untracked;
  try {
    diff = git(cwd, ['-c', 'core.quotepath=false', 'diff', '-U0', '--no-color', '--no-ext-diff', '--diff-filter=AMR', base, '--']);
    untracked = git(cwd, ['ls-files', '-z', '--others', '--exclude-standard']);
  } catch (e) {
    return { error: gitWhy(e) };
  }
  const out = new Map();
  let file = null;
  for (const line of diff.split('\n')) {
    if (line.startsWith('+++ ')) { // a path with a space ends in a tab; one with a quote or control byte is C-quoted
      const p = unquote(line.slice(4).replace(/\t$/, ''));
      file = p.startsWith('b/') ? p.slice(2) : null;
      continue;
    }
    const h = /^@@ -\S+ \+(\d+)(?:,(\d+))? @@/.exec(line);
    if (h && file) {
      const set = out.get(file) || new Set();
      const start = Number(h[1]), n = h[2] === undefined ? 1 : Number(h[2]);
      for (let i = 0; i < n; i++) set.add(start + i);
      out.set(file, set);
    }
  }
  for (const f of untracked.split('\0')) if (f) out.set(f, null);
  return out;
}

const globRe = (g) => new RegExp('^' + g.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*\/?/g, '\u0000').replace(/\*/g, '[^/]*').replace(/\u0000/g, '.*') + '$');

export function staticResults(cwd, changed, config) {
  const ignore = (config.ignore || []).map(globRe);
  const files = [...changed.keys()].filter((f) => UI(f) && !SKIP_DIR.test('/' + f) && !ignore.some((r) => r.test(f)));
  const out = [], read = [], unread = [];
  for (const f of files) {
    let text;
    try { text = readFileSync(join(cwd, f), 'utf8'); } catch (e) { if (e.code !== 'ENOENT') unread.push(f); continue; } // ENOENT: deleted after the diff
    read.push(f);
    out.push(...findings(f, text, changed.get(f)));
  }
  return { files: read, found: out, unread };
}

// baselinePending: a rendered issue seen in CI before any baseline is committed; reported, never blocking.
const blocking = (f, level) => !f.overridden && !f.baselinePending && (f.level === 'A' || level === 'AA');

export function verdict({ files, found, render, level, unread = [] }) {
  const block = found.filter((f) => blocking(f, level)).concat((render?.fresh || []).filter((f) => blocking(f, level)));
  const overridden = found.filter((f) => f.overridden);
  const advisory = found.filter((f) => !f.overridden && !blocking(f, level)).concat((render?.fresh || []).filter((f) => !blocking(f, level)));
  const state = !files.length ? (unread.length ? 'UNJUDGED' : 'SKIPPED') : block.length ? 'FAIL' : overridden.length ? 'OVERRIDDEN' : 'PASS';
  return { state, block, overridden, advisory, files, render, unread };
}

const where = (f) => f.file ? `${f.file}:${f.line}` : f.url;
const item = (f, i) => `${i + 1}. ${where(f)}  ${f.rule} (WCAG ${f.wcag} ${f.level}): ${f.msg}. Fix: ${f.fix}.`;

export function badge(v) {
  const parts = [`design gate ${VERSION}: ${v.state}`, `${v.block.length} blocking`, `${v.advisory.length} advisory`];
  if (v.overridden.length) parts.push(`${v.overridden.length} overridden`);
  if (v.render?.state === 'UNJUDGED') parts.push('rendered check not run');
  return parts.join(' · ');
}

export function hookReason(v, level) {
  const lines = [`design gate: FAIL. ${v.block.length} new WCAG ${level === 'AA' ? 'A/AA' : 'A'} failure${v.block.length > 1 ? 's' : ''} in what you just wrote:`];
  lines.push(...v.block.slice(0, 12).map(item));
  if (v.block.length > 12) lines.push(`… and ${v.block.length - 12} more of the same kinds.`);
  lines.push('Fix them, then finish again; the gate re-runs. To keep one on purpose, add the comment',
    '`design-gate-ignore: <reason>` on that line; it is listed as OVERRIDDEN in every report.');
  return lines.join('\n');
}

export function markdown(v, level) {
  const out = [`<!-- design-gate -->`, `**${badge(v)}**`, ''];
  if (v.state === 'SKIPPED') return [...out, 'No UI files changed; nothing to check.'].join('\n');
  if (v.files.length) out.push(`Checked ${v.files.length} changed UI file${v.files.length === 1 ? '' : 's'} at WCAG ${level === 'AA' ? 'A + AA' : 'A'} (AA is advisory at level A).`, '');
  const table = (title, rows) => rows.length ? [`**${title}**`, '', '| Where | Rule | WCAG | Fix |', '|---|---|---|---|',
    ...rows.map((f) => `| \`${where(f)}\` | ${f.rule} | ${f.wcag} ${f.level} | ${(f.overridden ? `ignored: ${f.overridden}` : f.fix).replace(/\|/g, '\\|')} |`), ''] : [];
  out.push(...table('Blocking', v.block), ...table('Advisory', v.advisory), ...table('Overridden', v.overridden));
  if (v.unread?.length) out.push(`Not read (so not checked): ${v.unread.map((f) => `\`${f}\``).join(', ')}.`, '');
  if (v.render) out.push(renderLine(v.render));
  return out.join('\n');
}

function renderLine(r) {
  if (r.state === 'UNJUDGED') return `Rendered check not run: ${r.why}`;
  const head = `Rendered check: ${r.urls.length} page(s) with axe-core`;
  return r.pending ? `${head}. No baseline is committed yet, so its ${r.pending} issue(s) are advisory: run the gate locally once and commit .design-gate/baseline.json.`
    : `${head}, ${r.carried} known issue(s) carried from the baseline.`;
}

// git paths are relative to the repository root, so every read, the config and the state hang off it, wherever
// in the repository Claude is working.
const repoRoot = (dir) => tryGit(dir, ['rev-parse', '--show-toplevel'])?.trim() || dir;

// Per-session memory outside the repo, so the gate never leaves files behind for git to show.
function stateFile(cwd, session) {
  const dir = join(tmpdir(), 'design-gate', createHash('sha256').update(resolve(cwd)).digest('hex').slice(0, 16));
  mkdirSync(dir, { recursive: true });
  return { dir, path: join(dir, `${String(session || 'none').replace(/[^\w-]/g, '')}.json`) };
}
const readJson = (p, d) => { try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return d; } };

function sessionStart(input) {
  const cwd = repoRoot(input.cwd || process.cwd());
  const head = tryGit(cwd, ['rev-parse', 'HEAD'])?.trim();
  const { path } = stateFile(cwd, input.session_id);
  const prev = readJson(path, {});
  if (!prev.started || input.source === 'startup' || input.source === 'clear') writeFileSync(path, JSON.stringify({ started: true, base: head || null, blocks: 0 }));
  return {};
}

// What this session changed, and what narrowed it ({ note }), or { noGit } / { error }.
//   started, base still there: since base | started, no commit then: since the empty tree (all of it is new)
//   started, base gone (rebase, amend): since the current HEAD, said once | no session start recorded: since HEAD, said
function sessionChanges(cwd, st) {
  if (tryGit(cwd, ['rev-parse', '--git-dir']) === null) return { noGit: true };
  const head = tryGit(cwd, ['rev-parse', '--verify', '-q', 'HEAD'])?.trim();
  let base = st.started && !st.base ? EMPTY_TREE : st.base, note = null;
  if (base && base !== EMPTY_TREE && tryGit(cwd, ['cat-file', '-e', `${base}^{commit}`]) === null) {
    base = head || EMPTY_TREE;
    note = 'the commit this session started from is gone (rebase or amend), so from now on it judges changes since the current commit';
  } else if (!st.started) {
    base = head || EMPTY_TREE;
    note = 'no session start was recorded (plugin added mid-session?), so from now on it judges changes since the current commit';
  }
  const changed = changes(cwd, base);
  // A narrowed scope is adopted as the session's base, so its note is said once and the next turn keeps the scope.
  return changed.error ? { error: changed.error } : { changed, note, adopt: note ? base : null };
}

// A FAIL blocks the turn at most maxBlocks times in a row, then lets it end and says so once.
function failResponse(st, path, v, config) {
  const blocks = (st.blocks || 0) + 1;
  if (blocks > (config.maxBlocks ?? MAX_BLOCKS)) {
    writeFileSync(path, JSON.stringify({ ...st, blocks: 0 }));
    return { systemMessage: `design gate: FAIL left open after ${blocks - 1} attempts, ${v.block.length} blocking. First: ${where(v.block[0])} ${v.block[0].rule}. Fix them, or keep one on purpose with a \`design-gate-ignore: <reason>\` comment; the PR check shows the rest.` };
  }
  writeFileSync(path, JSON.stringify({ ...st, blocks }));
  return { decision: 'block', reason: hookReason(v, config.level) };
}

function passLine(v, config, render, note) {
  const notes = [v.advisory.length && `${v.advisory.length} advisory`, v.overridden.length && `${v.overridden.length} overridden`,
    v.unread.length && `not read, so not checked: ${v.unread.join(', ')}`, note,
    render?.state === 'UNJUDGED' && `rendered check not run: ${render.why}`,
    render?.created && `rendered baseline recorded: ${render.carried} issue(s) the pages have now, this session's included, carried from here on; read .design-gate/baseline.json before you commit it`].filter(Boolean);
  return `design gate: ${v.state} (${v.files.length} UI file${v.files.length === 1 ? '' : 's'}, WCAG ${config.level})${notes.length ? '; ' + notes.join('; ') : ''}.`;
}

async function stop(input, env) {
  if (!input) return { systemMessage: 'design gate: UNJUDGED. Claude Code sent hook input it could not read, so nothing was checked.' };
  const cwd = repoRoot(input.cwd || process.cwd());
  const { dir, path } = stateFile(cwd, input.session_id);
  const st = readJson(path, { base: null, blocks: 0 });
  const config = loadConfig(cwd);
  const say = (msg) => ({ systemMessage: msg });
  if (env.DESIGN_GATE === 'off') {
    appendFileSync(join(dir, 'override.log'), `${new Date().toISOString()} DESIGN_GATE=off ${env.DESIGN_GATE_REASON || '(no reason given)'}\n`);
    return say(`design gate: OVERRIDDEN (DESIGN_GATE=off, logged in ${join(dir, 'override.log')}). Nothing was checked.`);
  }
  if (config.error) return say(`design gate: UNJUDGED. ${config.error}; fix it and the gate runs again.`);
  const sc = sessionChanges(cwd, st);
  if (sc.noGit) {
    if (st.noGitSaid) return {};
    writeFileSync(path, JSON.stringify({ ...st, noGitSaid: true }));
    return say('design gate: UNJUDGED. It needs a git repository to see what changed (git init), so this session is not checked.');
  }
  if (sc.error) return say(`design gate: UNJUDGED. git could not list what changed (${sc.error}), so nothing was checked. The turn was not blocked.`);
  const next = { ...st, noGitSaid: false, ...(sc.adopt ? { base: sc.adopt, started: true } : {}) };
  const s = staticResults(cwd, sc.changed, config);
  // A turn that fails on markup never records the first rendered baseline: the note saying what it carried would be
  // lost behind the FAIL list, and the debt accepted unseen. The next turn that passes records it and says so.
  const pre = verdict({ ...s, render: null, level: config.level });
  const render = s.files.length && config.urls.length ? await rendered(cwd, config, { update: pre.state !== 'FAIL' }) : null;
  return judged(verdict({ ...s, render, level: config.level }), { next, path, config, render, note: sc.note });
}

// The answer for a judged turn. Every state but FAIL resets the block counter, so a later FAIL gets its full tries.
function judged(v, { next, path, config, render, note }) {
  const say = (msg) => ({ systemMessage: msg });
  if (v.state === 'FAIL') return failResponse(next, path, v, config);
  writeFileSync(path, JSON.stringify({ ...next, blocks: 0 }));
  if (v.state === 'SKIPPED') return note ? say(`design gate: SKIPPED, no UI change found; ${note}.`) : {};
  if (v.state === 'UNJUDGED') return say(`design gate: UNJUDGED. ${v.unread.length} changed UI file(s) could not be read (${v.unread.join(', ')}), so nothing was checked.`);
  return say(passLine(v, config, render, note));
}

// The PR check: exit 1 only on FAIL. Anything it could not judge still writes a report (so the comment replaces an
// older verdict) and exits 0: the gate never fails a pull request on its own trouble.
async function ci(args, cwd) {
  const report = (md, code) => { if (args.report) writeFileSync(args.report, md + '\n'); console.log(md); return code; };
  const unjudged = (why) => report(['<!-- design-gate -->', `**design gate ${VERSION}: UNJUDGED**`, '',
    `Nothing was checked: ${why} This check never fails a pull request on its own trouble.`].join('\n'), 0);
  try {
    const config = loadConfig(cwd);
    if (config.error) return unjudged(`${config.error}.`);
    const base = args.base || 'origin/HEAD';
    const mergeBase = tryGit(cwd, ['merge-base', base, 'HEAD'])?.trim();
    if (!mergeBase) return unjudged(`the base ${base} is not in this checkout. Fetch the history (actions/checkout with fetch-depth: 0).`);
    const changed = changes(cwd, mergeBase);
    if (changed.error) return unjudged(`git could not list what changed (${changed.error}).`);
    const s = staticResults(cwd, changed, config);
    const render = s.files.length && config.urls.length ? await rendered(cwd, config, { update: false }) : null;
    const v = verdict({ ...s, render, level: config.level });
    return report(markdown(v, config.level), v.state === 'FAIL' ? 1 : 0);
  } catch (e) {
    return unjudged(`internal error (${String(e.message).split('\n')[0].slice(0, 160)}).`);
  }
}

function parseArgs(argv) {
  const out = { cmd: argv[0] };
  for (let i = 1; i < argv.length; i++) if (argv[i].startsWith('--')) out[argv[i].slice(2)] = argv[i + 1]?.startsWith('--') ? true : argv[++i] ?? true;
  return out;
}

const readStdin = () => new Promise((res) => {
  if (process.stdin.isTTY) return res({});
  let d = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (c) => { d += c; });
  process.stdin.on('end', () => { try { res(JSON.parse(d || '{}')); } catch { res(null); } }); // null: stop says UNJUDGED
});

export async function main(argv, env = process.env) {
  const args = parseArgs(argv);
  if (args.cmd === 'ci') return ci(args, repoRoot(process.cwd()));
  const input = await readStdin();
  let out;
  try {
    out = args.cmd === 'session-start' ? (input ? sessionStart(input) : {}) : args.cmd === 'stop' ? await stop(input, env) : null;
  } catch (e) {
    out = { systemMessage: `design gate: UNJUDGED (internal error: ${String(e.message).split('\n')[0]}). The turn was not blocked.` };
  }
  if (out === null) { console.error('usage: run.mjs session-start | stop | ci --base <ref> [--report file]'); return 2; }
  if (Object.keys(out).length) process.stdout.write(JSON.stringify(out));
  return 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main(process.argv.slice(2)).then((c) => process.exit(c));
