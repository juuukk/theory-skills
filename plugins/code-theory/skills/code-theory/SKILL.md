---
name: code-theory
description: Judge code quality and safety against named computer-science principles (testing, reliability, simplicity, maintainability, privacy, security, architecture, design for the context of use) with an evidence-or-FAIL rule and plain-language consequences. Activate when code is planned, built, changed, reviewed, or declared done, and when deciding whether tests can be trusted. Companion of design-theory; code, infra and architecture are designed too, so load both when planning a change, and always when it touches rendered UI.
---

# Code Theory

"It works" and "the tests pass" are claims, not evidence. This skill reviews code against eight areas of established
computer-science principle, one named principle at a time, and says what each problem would cost in plain words.

## Who you are talking to

Adapt to the person. Lead with the consequence in plain words: "if the weather service is slow, the nightly job
hangs forever." Name the principle (Nygard's integration points, fail fast) when the person writes code, asks why,
or the name helps them look it up. Match their vocabulary; never lecture.

## The rule: evidence or FAIL

- Every finding cites what was observed: a file and line, a test run's output, a command's exit code.
- A principle with no evidence either way is not a PASS. Say it was not checked, or check it.
- A test suite that exits 0 but runs nothing proves nothing. Look for the count of tests that actually ran.
- Fix the code or the test, never the wording of the finding.

## The eight areas

| Area | The question | Read |
|---|---|---|
| Tests | Would the tests notice if this code were wrong? | `references/tests.md` |
| Reliability | What happens when something it depends on fails, hangs or runs twice? | `references/reliability.md` |
| Simplicity | Is there less here than there could be, and can each part change alone? | `references/simplicity.md` |
| Maintainability | Can the next person change this safely? | `references/maintainability.md` |
| Privacy | Does personal data go only where it must, for only as long as it must? | `references/privacy.md` |
| Security | Could someone misuse this, or did it ship a secret or a vulnerable dependency? | `references/security.md` |
| Architecture | Does the shape hold: what depends on what, what changes together, what was decided and why? | `references/architecture.md` |
| Design | Was it built for the moments it will really run in (offline, a killed process, a slow service, a tired person at night), not for a desk? | design-theory research.md § Context map |

## How to apply it

- **Planning a change:** read the intent or spec first. If it has a context map (design-theory), each edge moment of
  offline, low battery, a killed process or a slow service is a reliability case the code must answer; if it has none,
  write one before building. Design shapes the plan here; the review at the end is the second pass.
- **Quick change:** check the areas the change touches, and weave one or two principles into the answer as rationale.
- **Review or "is it done?":** go area by area over the changed code. Each finding gets a priority (HIGH / MED / LOW),
  the evidence, the named principle, and one plain-language consequence line.
- **Declaring done:** run the project's tests and type checker and read their output, then re-check the findings
  against the code as it now is, not as planned.

## Reporting

Lead with the verdict and the consequence lines, not jargon: "Two places could hang the nightly job if a site is
slow; both now have a timeout." Never pass on a raw tool error. Fix first, then report what was found, what was fixed
and what changes for the person.
