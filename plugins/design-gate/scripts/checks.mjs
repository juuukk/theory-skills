// Static WCAG checks on the markup an agent just wrote. Precision over recall: a rule fires only when the
// tag alone proves the failure; anything dynamic ({...spread}, {expr} children, a component) is left to the
// rendered check, because one false block teaches a developer to uninstall the gate.

export const MARKUP = /\.(html?|jsx|tsx|vue|svelte|astro|php|erb|hbs|njk|liquid)$/i;
export const STYLE = /\.(css|scss|sass|less)$/i;
export const IGNORE_RE = /design-gate-ignore:\s*(\S[^\n]*?)\s*(?:-->|\*\/|\}|$)/m;

const RULES = {
  'img-alt': { wcag: '1.1.1', level: 'A', msg: '<img> has no alt text',
    fix: 'add alt="" if the image is decorative, otherwise alt that says what it shows' },
  'html-lang': { wcag: '3.1.1', level: 'A', msg: '<html> has no lang',
    fix: 'add lang="en" (or the page language) to <html>' },
  'button-name': { wcag: '4.1.2', level: 'A', msg: '<button> has no accessible name',
    fix: 'put visible text in the button, or add aria-label="what it does"' },
  'link-name': { wcag: '2.4.4', level: 'A', msg: '<a href> has no accessible name',
    fix: 'put link text in the <a>, or add aria-label="where it goes"' },
  'input-label': { wcag: '1.3.1', level: 'A', msg: 'form field has no label',
    fix: 'wrap it in <label>, point a <label for> at its id, or add aria-label (a placeholder is not a label)' },
  'tabindex-positive': { wcag: '2.4.3', level: 'A', msg: 'tabindex above 0 reorders keyboard focus',
    fix: 'use tabindex="0" or none, and order the markup instead' },
  'click-keyboard': { wcag: '2.1.1', level: 'A', msg: 'click handler on a <div>/<span> that a keyboard cannot reach',
    fix: 'use a <button> (or add role, tabindex="0" and a key handler)' },
  'viewport-zoom': { wcag: '1.4.4', level: 'AA', msg: 'viewport meta blocks zoom',
    fix: 'remove user-scalable=no and maximum-scale' },
  'focus-outline': { wcag: '2.4.7', level: 'AA', msg: ':focus removes the outline with nothing in its place',
    fix: 'keep the outline, or style :focus-visible with an outline or box-shadow' },
};

// One opening tag from `start` (at '<'), honouring quotes and JSX braces, so `alt={x > 1 ? a : b}` stays whole.
export function readTag(text, start) {
  let depth = 0, quote = null;
  for (let i = start + 1; i < text.length; i++) {
    const c = text[i];
    if (quote) { if (c === quote) quote = null; continue; }
    if (c === '"' || c === "'" || (c === '`' && depth > 0)) quote = c;
    else if (c === '{') depth++;
    else if (c === '}') depth = Math.max(0, depth - 1);
    else if (c === '>' && depth === 0) return text.slice(start, i + 1);
  }
  return null;
}

// An attribute counts in every template syntax: alt="x", Vue :alt / v-bind:alt, Svelte {alt} shorthand.
const has = (tag, name) => new RegExp(`(?:[\\s{]:?|v-bind:)${name}(?=[\\s=/>}])`, 'i').test(tag);
const attr = (tag, name) => {
  if (new RegExp(`\\{\\s*${name}\\s*\\}`, 'i').test(tag)) return { dynamic: true, value: name }; // Svelte {id}
  const m = new RegExp(`\\s(:|v-bind:)?${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|\\{\\s*["'\`]([^"'\`]*)["'\`]\\s*\\}|\\{([^}]*)\\}|([^\\s>]+))`, 'i').exec(tag);
  if (!m) return undefined;
  if (m[1] || m[5] !== undefined) return { dynamic: true, value: m[5] ?? m[2] ?? m[3] };
  return { dynamic: false, value: m[2] ?? m[3] ?? m[4] ?? m[6] };
};
// Directives that fill an element's text at runtime, so its children say nothing about its name.
const FILLED = /\s(?:v-text|v-html|x-text|x-html|set:html|set:text|th:text|dangerouslySetInnerHTML|\[innerHTML\]|\[textContent\]|innerHTML)\s*=/;
const spread = (tag) => /\{\s*\.\.\./.test(tag) || /\sv-bind\s*=|\s\{\.\.\.\$\$props\}/.test(tag);
const named = (tag) => ['aria-label', 'aria-labelledby', 'title'].some((n) => has(tag, n));
const hidden = (tag) => /aria-hidden\s*=\s*["'{]?\s*true/i.test(tag) || /role\s*=\s*["']?(presentation|none)\b/i.test(tag);

// Text a screen reader would announce from an element's children, or null when it cannot be known statically.
export function childName(inner) {
  if (/\{[^}]*\}|\$\{|\{\{|<%|<\?|<[A-Z]|<[a-z]+-[a-z]|<slot\b|@\w+\(|\s(?::|v-bind:)[\w-]+\s*=|\s(?:v-text|v-html|x-text)\s*=/.test(inner)) return null;
  let names = '';
  inner.replace(/<img\b[^>]*>/gi, (t) => { const a = attr(t, 'alt'); if (a && a.value) names += a.value; return ''; });
  inner.replace(/<title\b[^>]*>([\s\S]*?)<\/title>/gi, (_, t) => { names += t; return ''; });
  inner.replace(/<[^>]*aria-label\s*=\s*"([^"]+)"[^>]*>/gi, (_, t) => { names += t; return ''; });
  const text = inner.replace(/<svg\b[\s\S]*?<\/svg>/gi, '').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
  return (names + text).trim();
}

function closeOf(text, from, name) {
  const re = new RegExp(`<(/?)${name}(?![-\\w:.])`, 'gi');
  re.lastIndex = from;
  let depth = 1, m;
  while ((m = re.exec(text))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return m.index;
  }
  return -1;
}

function insideLabel(text, at) {
  const before = text.slice(0, at);
  return (before.match(/<label\b/gi) || []).length > (before.match(/<\/label>/gi) || []).length;
}

function labelledById(text, tag) {
  const id = attr(tag, 'id');
  if (!id) return false;
  if (id.dynamic) return true;
  const esc = id.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:for|htmlFor)\\s*=\\s*(?:"|'|\\{\\s*["'\`])${esc}["'\`]`).test(text)
    || new RegExp(`aria-labelledby\\s*=\\s*["'][^"']*\\b${esc}\\b`).test(text);
}

const SKIP_INPUT = /^(hidden|submit|button|image|reset)$/i;

const CLICK = /\s(onClick|onclick|@click|on:click|v-on:click)\s*=/;
const KEY = /(onKeyDown|onKeyUp|onkeydown|onkeyup|@keydown|@keyup|on:keydown|on:keyup)/;
const quiet = (tag) => !spread(tag) && !named(tag) && !hidden(tag);

// Name-bearing elements (<button>, <a href>): empty when the children announce nothing.
function nameless(ctx) {
  const { text, at, tag, name } = ctx;
  if (!quiet(tag) || tag.endsWith('/>') || FILLED.test(tag)) return false;
  const end = closeOf(text, at + tag.length, name);
  return end > 0 && childName(text.slice(at + tag.length, end)) === '';
}

function unlabelled({ text, at, tag }) {
  if (!quiet(tag)) return false;
  const type = attr(tag, 'type');
  if (type && (type.dynamic || SKIP_INPUT.test(type.value))) return false;
  return !insideLabel(text, at) && !labelledById(text, tag);
}

// One check per element: returns the rule id it breaks, or null.
const TAG_CHECKS = {
  img: ({ tag }) => (!has(tag, 'alt') && quiet(tag) ? 'img-alt' : null),
  html: ({ tag, file }) => (/\.(html?|astro|php|erb|hbs|njk|liquid)$/i.test(file) && !has(tag, 'lang') && !spread(tag) ? 'html-lang' : null),
  button: (ctx) => (nameless(ctx) ? 'button-name' : null),
  a: (ctx) => (has(ctx.tag, 'href') && nameless(ctx) ? 'link-name' : null),
  input: (ctx) => (unlabelled(ctx) ? 'input-label' : null),
  div: ({ tag }) => (CLICK.test(tag) && !has(tag, 'role') && !/tabindex/i.test(tag) && !KEY.test(tag) && !spread(tag) ? 'click-keyboard' : null),
  meta: ({ tag }) => (/name\s*=\s*["']viewport/i.test(tag) && /(user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0+)?\b)/i.test(tag) ? 'viewport-zoom' : null),
};
TAG_CHECKS.textarea = TAG_CHECKS.select = TAG_CHECKS.input;
TAG_CHECKS.span = TAG_CHECKS.div;

function markupFindings(text, file) {
  const out = [];
  const tagRe = /<(img|html|button|a|input|textarea|select|div|span|meta)(?![-\w:.])/gi; // not <img-gallery>, <a.b>
  let m;
  while ((m = tagRe.exec(text))) {
    if (m[1][0] !== m[1][0].toLowerCase() && !/\.html?$/i.test(file)) continue; // `<A ...>` in JSX/Vue/Svelte is a component, not the HTML element
    const tag = readTag(text, m.index);
    if (!tag) continue;
    const name = m[1].toLowerCase();
    const rule = TAG_CHECKS[name]({ text, at: m.index, tag, name, file });
    for (const r of [rule, /\stab[iI]ndex\s*=\s*(?:["']|\{\s*)?([1-9]\d*)/.test(tag) && 'tabindex-positive']) {
      if (r) out.push({ rule: r, at: m.index, tag: tag.slice(0, 120) });
    }
  }
  return out;
}

const NO_OUTLINE = /outline\s*:\s*(none|0)(?![.\w])/i;
const OTHER_RING = /box-shadow|border(-\w+)?\s*:|outline-(color|style|width)/i;

function styleFindings(text) {
  if (!text.includes('{')) return []; // indented .sass: no braces to read, and the rule regex would crawl it
  const rules = [...text.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
  // `:focus { outline: none }` then `:focus-visible { outline: 2px ... }` is the reset-and-replace pattern, not a loss.
  const replaced = rules.some(([, sel, body]) => /:focus-visible/.test(sel) && ((/outline\s*:/i.test(body) && !NO_OUTLINE.test(body)) || OTHER_RING.test(body)));
  if (replaced) return [];
  const out = [];
  for (const m of rules) {
    const sel = m[1], body = m[2];
    if (!/:focus(?![-\w])/.test(sel) || /:not\(\s*:focus-visible\s*\)/.test(sel)) continue;
    if (!NO_OUTLINE.test(body) || OTHER_RING.test(body)) continue;
    out.push({ rule: 'focus-outline', at: m.index + m[0].indexOf(sel.trim()), tag: sel.trim().slice(0, 120) });
  }
  return out;
}

const lineAt = (text, at) => text.slice(0, at).split('\n').length;

// added: Set of 1-based line numbers this change added, or null meaning every line is new (an untracked file).
export function findings(file, text, added) {
  const raw = MARKUP.test(file) ? markupFindings(text, file) : STYLE.test(file) ? styleFindings(text) : [];
  const lines = text.split('\n');
  return raw.map((f) => {
    const line = lineAt(text, f.at);
    // The ignore comment counts on the tag's own lines or the line above, never on a neighbour's line below.
    const near = lines.slice(Math.max(0, line - 2), line - 1 + f.tag.split('\n').length).join('\n');
    const ignored = IGNORE_RE.exec(near);
    return { ...RULES[f.rule], rule: f.rule, file, line, snippet: f.tag.split('\n')[0],
      ...(ignored ? { overridden: ignored[1] } : {}) };
  }).filter((f) => !added || added.has(f.line));
}
