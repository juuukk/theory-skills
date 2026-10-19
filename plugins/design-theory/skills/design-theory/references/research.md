# Research Methods

## Contextual Inquiry

Observe users doing real tasks in their real context. Not asking them to imagine. Not asking them to remember. Watching.

**The four principles:**

**Context** — Research happens where the work happens, not in a lab. A user testing a mobile app at a desk, in silence, with both hands free is performing a different task than the same user in their actual context — outside, loud, one-handed, cognitively occupied, mid-movement. No lab test replicates this. The gap between lab and real context is directly proportional to how stressful, physical, or socially embedded the real context is.

**Partnership** — The researcher and user are co-investigators, not questioner and subject. The user is the expert in their own experience; the researcher is the expert in observation and synthesis. Neither can do the other's job.

**Interpretation** — Observations are interpreted in real time, collaboratively. "I noticed you tapped that twice — what were you thinking?" The interpretation is checked with the user immediately rather than inferred later.

**Focus** — Sessions are focused on specific work, not open-ended. "Show me how you'd use this to find where to go next" not "use the app however you want."

**The observer effect:** the presence of a researcher changes behavior. This is unavoidable, not just a methodological footnote — see the quantum cognition note below. The best contextual inquiry designs for this by building trust, using non-reactive observation where possible, and triangulating across multiple sessions.

For tools used in demanding physical contexts: test in an approximation of that context before the real one. Bring the prototype to a context that resembles where it will actually be used — more valid than any equivalent amount of lab time.

---

## Participatory Design / Co-Design

Involve users in the design process as active collaborators, not passive subjects.

The traditional model: designer solves a problem for users. The participatory model: designer and users solve the problem together. Users are experts in their own experience; designers are experts in making structure from that experience.

**Techniques:**
- Co-creation workshops (users generating concepts alongside designers)
- Generative tools (cultural probes, design games, card sorts)
- Prototype co-creation (users building with simple materials to show what they mean)
- Futures workshops (imagining desired futures, then working backward)

**For a personal tool:** the designer is also the user. This collapses the distinction but creates a different problem — proximity blindness. The designer-user cannot see their own assumptions because they're embedded in them. Countermeasure: write use cases as if designing for someone else. "A person who has never seen this lands on the main screen. What do they do?" — even if that person is you.

Participatory design practiced on a personal tool becomes a reflective practice: systematically stepping outside your own mental model to interrogate it.

---

## Usability Testing Variants

**Moderated:** researcher present, real-time probing, most insight per session. Expensive to scale. Best for: early-stage, exploratory, when you don't know what you don't know.

**Unmoderated:** remote, no researcher, scales easily, less depth. Misses the why behind observed behavior. Best for: validating a hypothesis with more participants than moderated allows.

**Guerrilla:** fast, cheap, real environments, minimal setup. Low rigor on edge cases and recruitment. Best for: quick signal before investing in more rigorous testing. Approach someone at a coffee shop, a co-working space, or wherever the target context is approximated.

**A/B testing:** statistical comparison of two variants at scale. Tells you which is better on a specific metric but not why. Can optimize toward local maxima and miss systemic problems. Best for: late-stage validation of specific decisions with sufficient traffic.

For personal tools: guerrilla is often the right method. Not unmoderated (no way to probe what you see); not A/B (no traffic scale); not full moderated (too expensive). A friend trying the thing in a real context, with you watching, is the right research.

---

## Jobs-to-be-Done (Christensen)

People don't buy products — they hire them to do a job. The job is the unit of analysis, not the product, the feature, or the user persona.

**The JTBD format:**
"When [situation], I want to [motivation], so I can [expected outcome]."

Example job statement for a companion/overlay tool: "When I'm in the middle of an experience, I want to stay oriented and not miss what I came for, so I can be fully present without the tool becoming what I'm present to." That job statement governs every feature decision. Features that help the user be present without the tool = aligned. Features that require the user to attend to the tool = working against the job (see Weiser, references/systems.md).

**JTBD cuts through feature debates:** "Should we add a social sharing feature?" — does sharing help the user be present without the app? Probably not. Does it help them not miss what they came for? Tangentially. Is it aligned with the job? No.

**Competing jobs:** users often have multiple simultaneous jobs. "Help me decide what to see" (planning job) and "help me navigate there now" (wayfinding job) are different jobs that may need different views.

**Switch interviews (Ulwick):** understand what the user fired (stopped using) and what they hired this for. Why did they stop checking a separate schedule app and start using this? What was the "moment of hire"?

---

## Observer Effect in Research (quantum framing)

The observer effect from quantum mechanics — that measurement perturbs the system being measured — has a direct structural analogue in user research.

Any observation instrument changes what it observes. The user who knows they're being watched behaves differently (Hawthorne effect). The survey question that mentions anxiety creates anxiety salience. The usability test that asks "what were you thinking?" after a confused moment constructs a narrative that may not match the original experience.

This is not a flaw to be eliminated — it's a structural feature of observing self-aware systems. Research design accounts for it by:
- Triangulating across multiple methods (what users say, what they do, what they build)
- Preferring behavioral data over self-report for factual questions
- Using self-report only for meaning, values, and felt experience (where it's the only data source)
- Designing research instruments that minimize the most distorting forms of reactivity

*See also: references/behavioral.md — quantum cognition section on preference formation as a construction process, not a revelation.*

---

## CLI Usage Pattern (inferred from session data)

*Note: this is inferred from workflow feedback across sessions, not from tracked design-theory usage specifically.*

**The job Claude CLI is hired to do in this context:**
"When I open a session on a project I haven't touched in days, I want to reconstruct where I was and what to do next, so I can start working without a long orientation phase."

**MAP analysis (Fogg) applied to CLI session start:**
- Motivation: high at session open (user chose to open the session)
- Ability: low at session open (no context loaded yet)
- Prompt: the user opening the session is the prompt

The session-start ritual (skill, memory system, context reconstruction) is MAP alignment: it raises Ability before presenting the next Prompt (the first task). Sessions that stall do so when Ability is never raised — the user opens the session, gets asked a question they don't have context to answer, and loses momentum.

**SDT applied to CLI sessions:**
- Autonomy: sustained when the user directs the session, not the model
- Competence: confirmed when verification shows the work actually worked
- Relatedness: present when the model behaves like a collaborator rather than a command executor

**For research.md specifically:** the methodology this workflow embodies is contextual inquiry practiced as a daily ritual — verifying current truth against stale notes before acting on them. The session-start skill makes this explicit.
