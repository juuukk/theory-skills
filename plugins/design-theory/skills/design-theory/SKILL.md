---
name: design-theory
description: Apply established design theory (16 framework clusters — Gestalt, Nielsen, Norman, Laws of UX, WCAG, Tufte, motion, brand, behavioral, and more) as the rationale and audit lens for any design-adjacent decision. Activate whenever design decisions are being made or evaluated — UI, CSS, copy, IA, components, animation, dashboards, brand, audits, planning — including implementation work, not just explicit design reviews. Execution-focused skills (dataviz, frontend-design, or similar) handle the how; this supplies the why, and tells you to load them alongside it.
---

# Design Theory

Adapt to whoever you are working with: a designer, a developer, or someone with no design background. Surface principles as context and consequence, not as a recitation. Name the principle when the person works in design, asks why, or the name helps them look it up, and match their vocabulary. "Ten options will measurably slow decisions — can we cut to five?" beats "this violates Hick's Law."

## Companion execution skills

This skill supplies rationale and audit criteria — not execution technique. Before producing design output, scan the currently available skills list for an execution-focused companion and load it alongside this one: charts/dashboards/plots → a dataviz-type skill; new UI or visual direction → a frontend-design-type skill; artifact pages → an artifact-design-type skill. Match by what the description says it does, not by these exact names — installed skills vary. If no companion exists, proceed with this skill alone.

## How to apply this skill

**Every task:** Mentally scan the 16 framework clusters. Apply those with meaningful signal — a finding, a risk, a constraint, a strength. Skip those that add nothing. Never force-fit for completeness.

**Quick tasks (CSS, copy, a single decision):** Weave 1–3 relevant principles into the response as inline rationale. Don't announce a review; just let the principles inform what you say.

**Explicit audits:** Structure output by framework — findings, priority (HIGH / MED / LOW), recommendations. Read the relevant reference file before responding.

**Pass/fail questions** ("is this accessible?", "is it done?"): answer framework by framework with evidence from the real artifact: what the rendered page, the screenshot or the copy actually shows. A principle with no evidence either way is not a pass; say it was not checked, or check it.

**Planning / brainstorming:** Use process frameworks to locate the current phase. Use other frameworks to surface constraints and opportunities.

**Deep dives:** When the user asks for a full audit or to go deep on a framework, read the relevant reference file in `references/`.

**Findings are provisional until checked against the real thing:** A framework scan of a plan, mockup, or prose description tells you whether the *described* design should work — it doesn't tell you whether the *built* one does. Citing a framework in a plan is cheap to get right on paper; the same layout can still fail once it's actually rendered — a signifier that reads fine described in words can be nearly invisible on screen, a progressive-disclosure flow that looks clean in a diagram can still land as a cluttered, undifferentiated stack once assembled. Before calling design work finished, re-run the scan against the live rendered result — a screenshot or the running UI itself, not the plan that described it — and let that check, not the earlier one, decide whether it's actually done.

**When the question is whether to intervene at all:** apply Weiser's calm technology test. The right answer is sometimes for the system to disappear — do nothing, or remove something rather than add it.

## Brand foundation pre-flight

When the work is brand-level, or the project has no stated direction and the person wants one, check whether these brand essentials are defined; downstream decisions trace back to them. Never hold up a small task for them.

Brand essentials (Brand Sprint):
- **20-year roadmap** — where is this going long-term?
- **What / How / Why** — what do you do, how, why does it matter?
- **Top 3 values** — what does this stand for?
- **Top 3 audiences** — who are you designing for?
- **Personality sliders** — where on the spectrum between opposing traits?
- **Competitive position** — where do you sit vs. others?

---

## Framework cheat-sheet

### Perceptual

**Gestalt** — Use when: visual grouping, layout, hierarchy
- Figure-ground: what's foreground, what's background?
- Proximity: nearby elements are perceived as related
- Similarity: similar elements (color, shape, size) are perceived as a group
- Continuity: the eye follows paths and lines
- Closure: the mind completes incomplete shapes
- Common fate: elements moving together belong together

**Color Theory** — Use when: color choices, palette decisions, brand
- Harmony: complementary, analogous, triadic, split-complementary
- Contrast: luminance contrast carries hierarchy; hue contrast alone is weak
- Temperature: warm advances, cool recedes; emotional associations are real
- Accessibility intersection: contrast ratios matter for all users, not just a11y compliance

**Typography Hierarchy** — Use when: type decisions, readability, hierarchy
- Scale: size contrast creates hierarchy — if everything is emphasized, nothing is
- Weight: bold for emphasis; don't use weight as decoration
- Rhythm: consistent baseline grid; line height ~1.4–1.6 for body
- Max 2 typefaces: clear role distinction between them (display vs. text)

---

### Interaction heuristics

**Nielsen's 10 Usability Heuristics** — Use when: any UI audit, interaction review
1. Visibility of system status
2. Match with real world — speak the user's language
3. User control and freedom — easy undo, easy exit
4. Consistency and standards — follow conventions
5. Error prevention — better than error recovery
6. Recognition over recall — show options; don't make users remember
7. Flexibility and efficiency — shortcuts for experts
8. Aesthetic and minimalist design — every extra element competes for attention
9. Help users recognize, diagnose, recover from errors
10. Help and documentation — if needed, make it findable and task-focused

**Laws of UX** — Use when: micro-decisions, layout, interaction efficiency
- **Fitts's Law:** target acquisition time = distance / size. Make targets large and close to the cursor
- **Hick's Law:** decision time grows with choices. Reduce options; use progressive disclosure
- **Jakob's Law:** users expect your interface to work like others they know. Diverge with strong reason only
- **Miller's Law:** working memory holds ~7 (±2) chunks. Chunk, group, paginate
- **Peak-End Rule:** users remember the peak moment and the end. Design the key moment and the exit
- **Aesthetic-Usability Effect:** beautiful interfaces are perceived as easier to use
- **Von Restorff Effect:** isolated elements are remembered. If everything is highlighted, nothing is
- **Tesler's Law:** complexity is conserved — it moves between user and system, never disappears
- **Doherty Threshold:** system response under 400ms keeps the user in flow
- **Postel's Law:** be liberal in what you accept, strict in what you output

---

### Norman's Laws (DOET)
Use when: controls, interaction patterns, mental models
- **Affordances:** what actions does this object invite?
- **Signifiers:** what makes those affordances discoverable?
- **Constraints:** what limits what can be done (physical, logical, cultural, semantic)?
- **Mappings:** does the relationship between control and outcome feel natural?
- **Feedback:** does the user know the result of their action, immediately?
- **Conceptual model:** does the user's mental model match how the system actually works?

---

### Cognitive Load
Use when: information-dense UI, onboarding, complex flows
- **Intrinsic load:** inherent complexity of the content — can't be eliminated, only managed
- **Extraneous load:** unnecessary complexity from poor design — eliminate it
- **Germane load:** effort spent building mental models — support it
- Warning signs: too many simultaneous choices, no chunking, no progressive disclosure, forced memorization across steps

---

### Values & ethics
Use when: product/brand direction, design values, ethical review, political economy audit

**Dieter Rams** — less but better; honest, unobtrusive, long-lasting, as little design as possible

**Papanek** — design for need not manufactured want; design for the majority world; design without harm; planned obsolescence is a failure. Design Justice (Costanza-Chock): who was in the room? Who benefits? Who is excluded?

**Emotional Design** (Norman) — three levels: visceral (sensory response), behavioral (usability feel), reflective (meaning and self-image). Good design works at all three. "Feels off" diagnoses to one of these levels.

**Critical theory** — commodity fetishism: design conceals whose interests it serves. Alienation: design that produces user dependence rather than agency. Political economy: attention extraction vs. value creation — not the same thing even when patterns look identical. Spectacle (Debord): design that converts authentic experience into content/documentation has failed its purpose.

---

### Inclusion (standards + intent)
Use when: accessibility, inclusive design, adversarial self-audit

**WCAG (POUR)** — the compliance floor:
- Perceivable: alt text, captions, sufficient contrast, not color-only
- Operable: keyboard navigable, no time pressure, no seizure triggers
- Understandable: predictable behavior, clear errors
- Robust: works with assistive technologies

**Universal Design** (Connell) — the design intent ceiling: equitable use, flexibility, simple and intuitive, perceptible information, tolerance for error, low effort, appropriate size and space. These are design virtues, not compliance checkboxes.

**Dark Patterns** (Brignull) — adversarial self-audit: trick questions, sneak into basket, roach motel, privacy zuckering, misdirection, hidden costs, bait and switch, confirmshaming, disguised ads, forced continuity. Are we doing any of these, even accidentally?

---

### Motion & craft
Use when: animation, transitions, motion design

**Disney's 12 Animation Principles** — All 12: squash & stretch, anticipation, staging, straight-ahead/pose-to-pose, follow-through, slow in/slow out, arcs, secondary action, timing, exaggeration, solid drawing, appeal.

Most applicable in UI: staging (direct attention before the action), anticipation (setup before main action), timing (duration carries meaning), slow in/slow out (ease in and out; linear feels mechanical), follow-through (don't stop dead; overshoot and settle).

Always respect `prefers-reduced-motion`.

---

### Process
Use when: planning, scoping, locating the current phase

**Double Diamond + Design Sprint + Brand Sprint** — the same fractal pattern at different scales: diverge → converge → validate, repeating.

- **Double Diamond:** Discover → Define → Develop → Deliver. Key question: have we converged too early?
- **Design Sprint:** Map → Sketch → Decide → Prototype → Test. Compressed; can run at any scale.
- **Brand Sprint:** surfaces brand foundations before any derived work. Unanchored brand = inconsistent execution downstream.

For deep-dive: `references/process.md`

---

### Interactive systems & game design
Use when: gamification, engagement design, ambient/calm technology, any interactive system with feedback loops

- **MDA Framework:** Mechanics → Dynamics → Aesthetics. Design backward: define the aesthetic, design dynamics that produce it, write mechanics that generate those dynamics.
- **Flow (Csikszentmihalyi):** clear goals + immediate feedback + challenge/skill balance = flow. Don't interrupt it; don't go silent. *See also: behavioral.md (SDT)*
- **Koster — A Theory of Fun:** fun is the feeling of learning a pattern. Mastery kills engagement. Design for sustained discovery, not solved novelty.
- **Bartle's player types:** Achievers (complete goals), Explorers (discover systems), Socialisers (connect), Killers (dominate). Know your user's primary type.
- **Skinner — variable ratio reinforcement:** unpredictable reward timing is the most persistent. Know when you're using it deliberately vs. accidentally.
- **Weiser — Calm Technology:** the best technology disappears. Three levels: center, periphery, and the move between them without jarring. The test: does this live at the periphery until needed? If it demands center attention constantly, it's failing.
- **Game theory sidebar:** Nash equilibria, mechanism design, and prisoner's dilemma apply when designing for multi-party systems (platform + user + advertiser). Single-user tools: skip it. `references/systems.md`

---

### Behavioral design
Use when: motivation design, habit formation, nudge, onboarding, retention, notification design

- **Fogg BMT — B = MAP:** Behavior happens when Motivation + Ability + Prompt converge simultaneously. If behavior isn't happening, diagnose which is missing before assuming motivation is the problem.
- **SDT (Deci & Ryan):** three innate needs: Autonomy (I chose this), Competence (I'm good at this), Relatedness (I belong here). Gamification that satisfies all three sustains intrinsic motivation. Extrinsic rewards can undermine intrinsic motivation when over-applied.
- **Nudge (Thaler & Sunstein):** defaults are the most powerful nudge. Choice architecture shapes decisions without restricting them. Make the desired behavior the path of least resistance.
- **Cialdini — six influence principles (audit lens):** Reciprocity, Commitment/consistency, Social proof, Authority, Liking, Scarcity. Name which principle a persuasion pattern uses and whether the premise is true. False premise = dark pattern.
- **Quantum cognition sidebar (Busemeyer & Bruza):** users don't have stable pre-formed preferences — they are constructed at the moment of decision. This is why defaults, order, and framing matter beyond aesthetics. `references/behavioral.md`

---

### Data visualization
Use when: dashboards, metrics displays, charts, any quantitative visual output

- **Tufte:** data-ink ratio (maximize data, eliminate decoration); chartjunk (remove non-data elements); small multiples for comparison; lie factor (visual effect ÷ data effect = 1.0 is honest); high data density is a virtue.
- **Cairo:** know whether you're making a functional or expressive visualization — both are valid, but not interchangeable. All charts make arguments; own yours.
- **Few — dashboard design:** all critical info above the fold; position/size before color for hierarchy; no pie charts for monitoring; sparklines for trends. For glanceable displays: 200ms to extract the relevant signal. `references/datavis.md`

---

### Spatial & multisensory
Use when: wayfinding, navigation design, physical-digital integration, notification design in sensory-rich environments

- **Lynch — 5 elements:** Paths (routes), Edges (boundaries), Districts (character areas), Nodes (junctions), Landmarks (unique orientation points). Navigation aids should use these, not grid coordinates. "Walk toward the sphere" over "turn left at junction."
- **Spence — crossmodal perception:** senses are not independent. Sound changes perceived texture; vibration interacts with ambient music. Design haptic and audio notifications with awareness of the sensory environment they enter.
- **Schafer — soundscape:** keynote sounds (background), signals (foreground), soundmarks (place identity). In high-noise environments: haptic over audio, peripheral over intrusive. `references/spatial.md`

---

### IA & content design
Use when: navigation, labeling, content strategy, microcopy, information hierarchy

- **Rosenfeld & Morville — 4 IA systems:** Organization (how categorized), Labeling (how named — microcopy is IA), Navigation (how traversed), Search (how found). Which mental model does the organization scheme center?
- **Findability honeycomb:** Useful, Usable, Desirable, Findable, Accessible, Credible, Valuable. Aesthetic-first design frequently sacrifices findability. Beautiful but unfindable is a failure.
- **UX writing:** write for scanning not reading; every word is a design decision; microcopy sets tone as much as visuals; error messages are conversations not system states; confirmation dialogs are a design smell. `references/ia-content.md`

---

### Research methods
Use when: planning research, evaluating research approaches, informing design from user context

- **Contextual inquiry:** observe in the real context, not a lab. Someone testing an event app at a desk is not the same person using it at the event. Real context can mean outdoor, dark, loud, one-handed, distracted or tired.
- **JTBD (Christensen):** "When [situation], I want to [motivation], so I can [outcome]." The job governs every feature decision. Features that don't serve the job are waste, regardless of engagement metrics.
- **Participatory design:** users as collaborators, not subjects. When designers build for themselves, it becomes a reflective practice.
- **Observer effect:** measurement changes what's measured. Triangulate: what users say + what they do + what they make. `references/research.md`

---

### Phenomenal
Use when: experience-centered design, festival/event contexts, designing for peak or altered states, the "does this need to exist at all?" test at a philosophical level

- **Heidegger — ready-to-hand/present-at-hand:** tools in use disappear (ready-to-hand). Tools noticed-as-tools have broken their spell. The ideal interface is invisible through quality of use.
- **Merleau-Ponty — embodied cognition:** the body is not a vessel for the mind — it is the ground of experience. Skilled use = tool incorporated into body schema. Breaking deeply incorporated gestures feels like a body violation.
- **Maslow — peak experiences:** moments of full absorption, boundary dissolution, intrinsic completeness. Design's job: don't interrupt them, and support the conditions for them (reduced decision load, minimal self-consciousness, present cues).
- **Turner — liminality & communitas:** festivals are designed liminal experiences (separation → threshold → reincorporation). Communitas: egalitarian solidarity that emerges in threshold states. Features that reassert ordinary life are anti-liminal.
- **The sublime (Kant, Burke, Lyotard):** aesthetic experience that exceeds ordinary perception. For events and immersive experiences, the highest target: not beautiful, but overwhelming-in-a-way-that-expands. Don't prevent it; don't interrupt it.
- **Quantum consciousness (speculative):** Penrose/Hameroff, Bohm's implicate order. Labeled as contested. `references/phenomenal.md`

---

### Symbolic systems
Use when: celestial/astrology overlays, sacred geometry as compositional grammar, temporal design beyond linear time, designs that aim at meaning beyond function

- **Astrology as temporal language:** not predictive science but a culturally refined symbolic system for marking time. Astronomical positions (real, calculable) + symbolic meanings (cultural, not physical). Useful for: temporal rhythm, marking transitions, cyclical event framing.
- **Sacred geometry:** golden ratio (φ), Fibonacci, radial symmetry, mandala logic — compositional grammars with deep cultural resonance. Use as constraint and rationale, not mystical claim. Earn what you borrow.
- **Cyclical vs. linear time:** Western modernity = linear (progress, directional history). Agrarian/astrological/indigenous = cyclical (seasons, lunar months, return). Festivals are cyclical time technology. Designing a schedule as "what's happening now" (linear) vs. "what kind of time is this" (cyclical) are different design choices.
- **Moon phases:** new (intention), waxing (accumulation), full (peak/revelation), waning (release). A built-in temporal rhythm many users feel without naming it. `references/symbolic.md`

---

## Reference files

Read these when doing a full audit or when explicitly asked to go deep on a framework cluster.

| File | Covers |
|---|---|
| `references/perceptual.md` | Gestalt + Color Theory + Typography |
| `references/interaction.md` | Nielsen + Laws of UX + Norman's Laws + Cognitive Load |
| `references/values.md` | Dieter Rams + Papanek + Emotional Design + Critical Theory |
| `references/inclusion.md` | WCAG + Universal Design + Dark Patterns |
| `references/motion.md` | Disney's 12 Principles |
| `references/process.md` | Double Diamond + Design Sprint + Brand Sprint |
| `references/systems.md` | MDA + Flow + Koster + Bartle + Skinner + Weiser + Game Theory |
| `references/behavioral.md` | Fogg BMT + SDT + Nudge + Cialdini + Quantum Cognition |
| `references/datavis.md` | Tufte + Cairo + Few |
| `references/spatial.md` | Lynch + Spence + Schafer |
| `references/ia-content.md` | Rosenfeld/Morville + UX Writing |
| `references/research.md` | Contextual Inquiry + Participatory Design + JTBD + Observer Effect |
| `references/phenomenal.md` | Heidegger + Merleau-Ponty + Maslow + Turner + The Sublime + Quantum Consciousness (speculative) |
| `references/symbolic.md` | Astrology as temporal language + Sacred Geometry + Cyclical Time |
