// Rendered check: axe-core on the pages the agent's work shows up in, the part static markup cannot see
// (contrast, names computed from components, landmarks). Uses the project's own playwright-core and axe-core,
// or the copies the GitHub Action installs (DESIGN_GATE_DEPS). Old issues live in .design-gate/baseline.json and
// are carried; only issues missing from it block. Nothing here ever blocks on its own failure: it reports UNJUDGED.
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const BUDGET_MS = 60_000;
const NAV_MS = 15_000;
const TAGS = ['wcag2a', 'wcag21a', 'wcag2aa', 'wcag21aa', 'wcag22aa'];

export function resolveDeps(cwd, env = process.env) {
  const roots = [join(cwd, 'package.json'), env.DESIGN_GATE_DEPS && join(env.DESIGN_GATE_DEPS, 'package.json')].filter(Boolean);
  let pw = null, axe = null;
  for (const r of roots) {
    const req = createRequire(r);
    for (const name of ['playwright-core', 'playwright']) if (!pw) try { pw = req.resolve(name); } catch { /* not installed here, try the next root */ }
    if (!axe) try { axe = req.resolve('axe-core/axe.min.js'); } catch { /* same */ }
  }
  return pw && axe ? { pw, axe } : null;
}

// axe tags like wcag111 / wcag2aa → "1.1.1" and the conformance level.
export function wcagOf(tags) {
  const sc = tags.map((t) => /^wcag(\d)(\d)(\d+)$/.exec(t)).find(Boolean);
  const level = tags.some((t) => /^wcag2\d?aa$/.test(t)) ? 'AA' : 'A';
  return { wcag: sc ? `${sc[1]}.${sc[2]}.${sc[3]}` : tags.find((t) => t.startsWith('wcag')) || '?', level };
}

export function toFindings(url, violations) {
  return violations.flatMap((v) => v.nodes.map((n) => ({
    ...wcagOf(v.tags), rule: `axe:${v.id}`, url, target: n.target.join(' '),
    msg: `${v.help} (${n.target.join(' ')})`, fix: `see ${v.helpUrl}`,
    key: `${v.id}|${url}|${n.target.join(' ')}`,
  })));
}

const BASELINE = (cwd) => join(cwd, '.design-gate', 'baseline.json');
// null when no baseline exists; an unreadable one (a merge conflict, a truncated file) throws, so the rendered check
// says UNJUDGED instead of quietly re-recording today's issues as accepted.
export function readBaseline(cwd) {
  let text;
  try { text = readFileSync(BASELINE(cwd), 'utf8'); } catch (e) { if (e.code === 'ENOENT') return null; throw e; }
  try {
    const keys = JSON.parse(text).keys;
    if (Array.isArray(keys)) return new Set(keys);
  } catch { /* reported below */ }
  throw new Error('.design-gate/baseline.json cannot be read (a merge conflict or a cut-off file?); fix it, or delete it to record a new one.');
}
export function writeBaseline(cwd, keys) {
  mkdirSync(join(cwd, '.design-gate'), { recursive: true });
  writeFileSync(BASELINE(cwd), JSON.stringify({ note: 'Known rendered issues the design gate carries instead of blocking. Remove a line once fixed; the gate drops fixed ones itself.', keys: [...keys].sort() }, null, 2) + '\n');
}

// Splits current issues against the baseline. With no baseline, a local run records one (so day-one debt never
// blocks) and CI reports everything as advisory until a baseline is committed.
export function compare(current, baseline, { update, cwd }) {
  if (!baseline) {
    if (update) writeBaseline(cwd, current.map((f) => f.key));
    return { fresh: [], carried: update ? current.length : 0, advisoryAll: update ? [] : current, created: update };
  }
  const fresh = current.filter((f) => !baseline.has(f.key));
  const live = new Set(current.map((f) => f.key));
  const fixed = [...baseline].filter((k) => !live.has(k));
  if (update && fixed.length) writeBaseline(cwd, [...baseline].filter((k) => live.has(k)));
  return { fresh, carried: current.length - fresh.length, advisoryAll: [], created: false };
}

async function launch(chromium) {
  const errors = [];
  for (const opts of [{}, { channel: 'chrome' }, { channel: 'msedge' }]) {
    try { return await chromium.launch({ headless: true, ...opts }); } catch (e) { errors.push(e.message.split('\n')[0]); }
  }
  throw new Error(`no browser could start (run: npx playwright install chromium). ${errors[0]}`);
}

export async function rendered(cwd, config, { update }) {
  const deps = resolveDeps(cwd);
  if (!deps) return { state: 'UNJUDGED', why: 'playwright-core and axe-core are not installed in this project (npm i -D playwright-core axe-core).', urls: config.urls };
  const started = Date.now();
  let browser;
  try {
    const mod = await import(pathToFileURL(deps.pw).href);
    const chromium = mod.chromium ?? mod.default?.chromium; // playwright-core is CommonJS; named exports are not always detected
    browser = await launch(chromium);
    const page = await browser.newPage();
    const current = [];
    for (const url of config.urls) {
      if (Date.now() - started > BUDGET_MS) return { state: 'UNJUDGED', why: `over the ${BUDGET_MS / 1000} s budget after ${current.length} issue(s); list fewer urls.`, urls: config.urls };
      let resp;
      try {
        resp = await page.goto(url, { waitUntil: 'load', timeout: NAV_MS });
      } catch (e) {
        return { state: 'UNJUDGED', why: `nothing answered at ${url} (${e.message.split('\n')[0].slice(0, 80)}); start the dev server or fix "urls" in .design-gate.json.`, urls: config.urls };
      }
      if (resp && !resp.ok()) return { state: 'UNJUDGED', why: `${url} answered HTTP ${resp.status()}, so the page to check was not there; fix "urls" in .design-gate.json or the server.`, urls: config.urls };
      await page.addScriptTag({ content: readFileSync(deps.axe, 'utf8') });
      const res = await page.evaluate((tags) => window.axe.run(document, { runOnly: { type: 'tag', values: tags }, resultTypes: ['violations'] }), TAGS);
      current.push(...toFindings(url, res.violations));
    }
    const cmp = compare(current, readBaseline(cwd), { update, cwd });
    return { state: 'JUDGED', urls: config.urls, fresh: [...cmp.fresh, ...cmp.advisoryAll.map((f) => ({ ...f, baselinePending: true }))],
      carried: cmp.carried, created: cmp.created, pending: cmp.advisoryAll.length };
  } catch (e) {
    return { state: 'UNJUDGED', why: e.message.split('\n')[0].slice(0, 160), urls: config.urls };
  } finally {
    await browser?.close().catch(() => { /* already gone; nothing left to free */ });
  }
}

