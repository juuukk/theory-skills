# theory-skills

Two Claude Code skills that make Claude reason about your design and your code with named, established theory, and explain every finding as a plain-language consequence.

- **design-theory:** clusters of design theory, from Gestalt and Nielsen to WCAG, Tufte, behavioural design and calm technology, with a deep-dive reference for each.
- **code-theory:** seven areas of software-engineering principle (tests, reliability, simplicity, maintainability, privacy, security, architecture), where every finding needs evidence.

## Install

In Claude Code:

```
/plugin marketplace add https://gitlab.com/theory-skills/theory-skills.git
/plugin install design-theory@theory-skills
/plugin install code-theory@theory-skills
```

Both then show as installed under `/plugin`. Claude can load them on its own during design or code work, but for a quick question it often answers without them. Name the skill to be sure.

## Try it

- "Use design-theory to review this signup form. What would stop people finishing it?"
- "Use design-theory: is this dashboard readable at a glance? Be specific."
- "Use code-theory: I changed the import job. Can I trust these tests?"

You get findings in your own vocabulary: the consequence first ("ten options will slow every decision"), with the principle named when you want it ("Hick's Law").

## What design-theory covers

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

Every finding needs evidence from the code, a test run or a tool's output. A claim without evidence counts as a fail, not a pass.

Both skills are the theory and the way of applying it. They do not include a scoring or measurement system.

## Licence

CC BY 4.0: use, share and adapt it, with attribution to Jukka Yrjönen. See `LICENSE`.

If this helps, you can support it on [Ko-fi](https://ko-fi.com/juukk).
