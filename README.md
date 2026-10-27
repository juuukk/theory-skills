# theory-skills

Two Claude Code skills that make Claude reason about your design and your code with named, established theory, and explain every finding as a plain-language consequence.

- **design-theory:** clusters of design theory, from Gestalt and Nielsen to WCAG, Tufte, behavioural design and calm technology, with a deep-dive reference for each.
- **code-theory:** eight areas of software-engineering principle (tests, reliability, simplicity, maintainability, privacy, security, architecture, and design for the context of use), where every finding needs evidence.

## Install in Claude Code

Two steps. First add the marketplace from GitHub:

```
/plugin marketplace add juuukk/theory-skills
```

The same repository is on GitLab. From there, use the full https address (a bare gitlab.com/theory-skills/theory-skills does not work):

```
/plugin marketplace add https://gitlab.com/theory-skills/theory-skills.git
```

Then install the plugins you want:

```
/plugin install design-theory@theory-skills
/plugin install code-theory@theory-skills
```

Or do it in one command from your shell. This needs Claude Code v2.1.292 or newer:

```
claude plugin install design-theory --marketplace https://gitlab.com/theory-skills/theory-skills.git
claude plugin install code-theory --marketplace https://gitlab.com/theory-skills/theory-skills.git
```

Both then show as installed under `/plugin`. Claude can load them on its own during design or code work, but for a quick question it often answers without them. Name the skill to be sure. To remove one, run `/plugin uninstall design-theory@theory-skills` or `/plugin uninstall code-theory@theory-skills`.

Both plugins are Markdown and JSON files only, with no scripts and no hooks. Claude follows them as instructions, so you can read every line before you install.

## Other install routes

For Codex, Cline, Amp and the other agents that read Agent Skills, install them into a project with:

```
npx skills add https://gitlab.com/theory-skills/theory-skills
```

## Try it

- "Use design-theory to review this signup form. What would stop people finishing it?"
- "Use design-theory: is this dashboard readable at a glance? Be specific."
- "Use code-theory: I changed the import job. Can I trust these tests?"

You get findings in your own vocabulary: the consequence first ("ten options will slow every decision"), with the principle named when you want it ("Hick's Law").

## What design-theory covers

Design here is the whole system, not its surface: intents and specs, architecture, code, infra, failure states and messages are designed too. Use design-theory first when a plan is written, so design shapes the decisions; a review at the end is the second pass.

| Cluster | In one line |
|---|---|
| Perceptual | Gestalt, colour, typography and brand tokens: how the eye groups and ranks |
| Interaction heuristics | Nielsen's 10 heuristics and the Laws of UX (Fitts, Hick, Jakob, Miller and more) |
| Norman's laws | Affordances, signifiers, mappings, feedback, conceptual models |
| Cognitive load | Intrinsic, extraneous and germane load in dense screens and flows |
| Values and ethics | Rams, Papanek, design justice, emotional design, critical theory |
| Inclusion | WCAG, universal design, and a dark-pattern self-audit |
| Motion | Disney's 12 principles applied to UI, with reduced-motion respect |
| Process | Double Diamond, Design Sprint, Brand Sprint |
| Interactive systems | MDA, flow, Koster's theory of fun, calm technology, game theory |
| Behavioural design | Fogg's B=MAP, self-determination theory, nudges, Cialdini as an audit lens |
| Data visualisation | Tufte, Cairo and Few for charts and dashboards |
| Spatial and multisensory | Lynch's wayfinding, crossmodal perception, soundscape |
| IA and content | Rosenfeld and Morville's four systems, findability, UX writing |
| Research methods | Contextual inquiry, jobs to be done, participatory design |
| Phenomenal | Heidegger's ready-to-hand, embodied cognition, peak experience, liminality |
| Symbolic systems | Cyclical time, proportion and sacred geometry, ritual and threshold |

## What code-theory covers

| Area | The question it asks of a change |
|---|---|
| Tests | Would the tests notice if this code were wrong? |
| Reliability | What happens when something it depends on fails, hangs or runs twice? |
| Simplicity | Is there less here than there could be, and can each part change alone? |
| Maintainability | Can the next person change this safely? |
| Privacy | Does personal data go only where it must, for only as long as it must? |
| Security | Could someone misuse this, or did it ship a secret or a vulnerable dependency? |
| Architecture | Does the shape hold: what depends on what, what changes together, what was decided and why? |
| Design | Was it built for the moments it will really run in (offline, a killed process, a slow service, a tired person at night), not for a desk? |

Every finding needs evidence from the code, a test run or a tool's output. A claim without evidence counts as a fail, not a pass.

Both free skills are the theory and the way of applying it; they contain no scoring or measurement system.

## design gate pro (paid)

The free skills never score anything. design gate pro is a separate Claude Code plugin that adds the scoring, for teams who want the theory enforced, not only consulted.

- **WCAG floor:** every turn, it blocks the turn from ending while the UI Claude just wrote fails WCAG A. After two tries the turn ends and reports FAIL.
- **Scored gates:** `/design-gate:audit` scores the change against the design clusters and seven of the eight code areas above (architecture is advisory), PASS or FAIL per cluster with evidence. With scored mode on, the pull-request check fails until a passing scored run for the pull request's files is committed.
- **Only what changed is judged,** so existing debt never blocks you.
- **Nothing hosted:** the plugin sends nothing anywhere itself. The judges are Claude subagents in your own Claude Code session, so scored runs use your Claude Code plan.

Needs Node 18+ and git. The scored gates also need Chrome, Node 20+ and Python 3.11+. The WCAG floor is MIT; the scored gates are under a subscriber licence.

It is a monthly subscription with a 14-day free trial, sold through Polar:

- [Per developer](https://buy.polar.sh/polar_cl_pHHOQNaAcCxFzjTgeG2u0kgQlUOZbc8GIxMpU1EZHTG): EUR 9 or USD 9 a month.
- [Per repository](https://buy.polar.sh/polar_cl_1EnpRVxPo4JtcQrS1uu1roxBMo8664dIAtFPP12uWZV): EUR 19 or USD 19 a month. One subscription, one repository's pull-request gate, any contributor.

At checkout you connect your GitHub account, and GitHub invites it to the private repository, whose README has the install steps. Cancel with one click in the Polar customer portal at any time. Repository access ends with the paid period; versions you already have stay usable under the subscriber licence.

The two skills above stay free.

## Licence

CC BY 4.0: use, share and adapt it, with attribution to Jukka Yrjönen. See `LICENSE`.

Both skills are free to use and adapt. Payment is optional, and [Ko-fi](https://ko-fi.com/juukk) is where it goes.
