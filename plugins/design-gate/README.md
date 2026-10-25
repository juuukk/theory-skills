# design-gate

A Claude Code plugin that stops Claude from saying "done" while the UI it just wrote fails WCAG A. Claude gets the list of failures with a fix for each, fixes them, and finishes. The same check runs as a GitHub Action on pull requests.

It judges only the lines this session added, so the accessibility debt already in your repository never blocks you. Old problems are not hidden either: they are just not this change's fault.

## What it checks

Without any setup, on `.html`, `.jsx`, `.tsx`, `.vue`, `.svelte`, `.astro` and template files, and on stylesheets:

| Rule | WCAG | Blocks at level A |
|---|---|---|
| `<img>` with no `alt` | 1.1.1 A | yes |
| `<html>` with no `lang` | 3.1.1 A | yes |
| `<button>` with no accessible name | 4.1.2 A | yes |
| `<a href>` with no accessible name | 2.4.4 A | yes |
| form field with no label (a placeholder is not a label) | 1.3.1 A | yes |
| `tabindex` above 0 | 2.4.3 A | yes |
| click handler on a `<div>` or `<span>` with no keyboard path | 2.1.1 A | yes |
| viewport meta that blocks zoom | 1.4.4 AA | reported only |
| `:focus { outline: none }` with nothing in its place | 2.4.7 AA | reported only |

A rule fires only when the markup alone proves the failure. When a tag spreads props, takes its text from an expression or wraps a component, the static check leaves it alone. One wrong block costs more trust than one missed finding.

With a running site, it also runs axe-core in a headless browser on the pages you list. That catches what markup cannot show: colour contrast, names computed from components, page titles, landmarks.

## Install

```
/plugin marketplace add juuukk/theory-skills
/plugin install design-gate@theory-skills
```

It needs Node 18 or newer and a git repository (it reads `git diff` to see what changed). Nothing is sent anywhere: the check runs on your machine, and the rendered check only opens the URLs you list.

## What you see

| State | When | What happens |
|---|---|---|
| PASS | UI changed and nothing new fails | one line, the turn ends |
| FAIL | a new WCAG A failure | Claude gets the list and keeps working; after 2 tries in one turn the gate lets the turn end and says FAIL |
| SKIPPED | no UI file changed | silence |
| OVERRIDDEN | a failure was kept on purpose | one line naming the count; listed in every report |
| UNJUDGED | the gate could not check (no git, a broken config, a page that does not answer or answers with an error) | one line saying why; never blocks |

## Keeping one on purpose

Put a comment on the line, or the line above, with a reason:

```html
<img src="spacer.gif"><!-- design-gate-ignore: legacy spacer, removed in #41 -->
```

```jsx
{/* design-gate-ignore: alt comes from the CMS at runtime */}
<img src={hero} />
```

To switch the gate off for a session, start Claude Code with `DESIGN_GATE=off` (and `DESIGN_GATE_REASON="..."` if you like). It says OVERRIDDEN every turn and logs it, so it is never off by accident.

## Settings

Optional `.design-gate.json` at the repository root:

```json
{
  "level": "A",
  "urls": ["http://localhost:4321/", "http://localhost:4321/signup"],
  "ignore": ["legacy/**"]
}
```

- `level`: `"A"` (default) blocks WCAG A and reports AA; `"AA"` blocks both.
- `urls`: pages for the rendered check. Install the tools in your project first: `npm i -D playwright-core axe-core`, then `npx playwright-core install chromium`. If your site is not running, the gate says UNJUDGED and carries on.
- `ignore`: globs the gate skips. Build output (`dist/`, `build/`, `.next/`, `node_modules/`) is always skipped.

The first rendered run records what the pages already fail in `.design-gate/baseline.json`, including anything that session added, so read it before you commit it: from then on only issues that are not in it block, and fixed ones drop out of it on their own.

## On pull requests

```yaml
# .github/workflows/design-gate.yml
name: design gate
on: pull_request
permissions:
  contents: read
  pull-requests: write
jobs:
  gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - uses: juuukk/theory-skills/gate@main
        # with:
        #   serve: npm ci && npm run build && (npm run preview &)
        #   wait-for: http://localhost:4321/
```

The check fails when the pull request adds a WCAG A failure. It posts one comment with a table of what to fix and updates that same comment on every push. A pull request with no UI change gets no comment, unless an earlier push left one: then that comment is updated, so an old FAIL never stands. If the gate cannot judge (no base commit, a broken config), the comment says UNJUDGED and the check stays green: it never fails a pull request on its own trouble.

## Limits

It is a floor, not an audit. Passing means no new failure of the rules above, not that the page is accessible: that still takes a person with a screen reader and a keyboard. Pair it with the `design-theory` skill in this repository for the judgement no rule can make.

## Run the tests

```
node --test test/gate.test.mjs
```

The rendered-check test runs when `DESIGN_GATE_DEPS` points at a folder with `playwright-core` and `axe-core` installed.

MIT licence.
