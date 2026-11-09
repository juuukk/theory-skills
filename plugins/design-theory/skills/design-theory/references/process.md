# Process: Double Diamond + Design Sprint + Brand Sprint

## The Underlying Pattern

All three frameworks express the same fractal structure: **diverge → converge → validate**, repeating.

The pattern applies at any scale:
- **Project scale:** months-long exploration and delivery
- **Sprint scale:** days or hours of focused problem-solving
- **Micro scale:** a single design decision, a conversation, a sketch session

The timebox (5 days, a half-day, an afternoon) is a container — a discipline tool to prevent endless divergence or premature convergence. The pattern is the thing. Understanding the pattern means you can apply it whether you're planning a product roadmap or deciding which of two layout directions to pursue.

**Premature convergence is the most common process failure.** Teams move from discovery directly to execution without passing through a genuine definition phase. The result: building the right solution to the wrong problem, or building without alignment on what the problem actually is.

---

## Double Diamond

### Origin
Developed by the British Design Council in 2005 from observational research into how designers actually work. It visualized the diverge/converge pattern that runs through design thinking and made it teachable.

### The four phases

```
Discover ——> Define ——> Develop ——> Deliver
   (diverge)  (converge) (diverge)  (converge)
```

**Discover (diverge)**
Explore the problem space as broadly as possible before narrowing. Research users, context, constraints, analogous problems. The goal is to resist the first plausible problem definition and actually understand what's happening.

Activities: user research, field observation, interviews, desk research, stakeholder mapping, analogous domain exploration.

Failure mode: skipping this phase because "we already know the problem." Teams that skip discovery solve the problem they assumed they had, which is often a symptom of the real problem. The scored version, with its inputs, problem-first rule, gate and checks, is in § Discover in full below.

**Define (converge)**
Synthesize what was discovered. Converge on the right problem to solve — not all the problems, not the most obvious problem, but the one whose solution creates the most value. Output: a design brief, a point of view, a how-might-we question, a validated problem statement.

This is the pivot point of the diamond. If you converge on the wrong problem here, the entire second diamond is wasted effort. Take time here.

Activities: affinity mapping, insight synthesis, problem framing, design principles, success criteria.

Failure mode: defining the problem as a solution in disguise ("How might we build a better onboarding flow?" assumes the solution is an onboarding flow).

**Develop (diverge)**
Explore the solution space broadly. Generate many possible solutions before committing to any. The goal is to avoid anchoring on the first solution that seems to work and to surface better options.

Activities: ideation (brainstorming, SCAMPER, analogous inspiration), concept development, prototyping, design sprints.

Failure mode: developing a single solution in detail without comparing alternatives. Confirmation bias sets in quickly once effort has been invested.

**Deliver (converge)**
Test, iterate, and converge on the right solution. Validate with real users. Refine based on what you learn. Launch.

Activities: user testing, A/B testing, pilot programs, iteration cycles, delivery.

Failure mode: treating the first tested solution as validated. A single round of testing reveals problems; it doesn't confirm the solution is optimal.

### The fractal dimension
Every phase of the Double Diamond contains its own smaller diamond. A discovery research project has its own discover/define/develop/deliver cycle. A single design decision — "which of these three navigation patterns?" — has its own micro-cycle: explore options, define criteria, develop candidates, test and decide.

Recognizing which phase you're in, at which scale, is the primary practical use of the Double Diamond.

---

## Discover in full (scored)

Discover is the stage teams skip most often, and the one they most often fake: a session "already knows the problem", writes down a solution and calls that Define. The rules below give Discover an output that can be checked, whether a person did the work or an agent did it unattended.

**A gate sits between Discover and Build**, the same way one sits between Build and Deliver. Discover can run unattended. Building on its result waits for a human yes.

An **intent** is the project's written statement of its goal and its evidence. Any file the audit is pointed at counts: a brief, an issue or a spec.

### Inputs, ranked by how far they can be trusted
1. **Observed behaviour:** logs, metrics, analytics, error reports, support mail, the product used in its real context.
2. **What users say unprompted:** reviews, issues, forum threads, free-text survey answers. Quote them, count the repeats, note the date.
3. **Desk research:** competitors, documentation, papers, analogous domains.
4. **Recall and assumption:** a hypothesis to test, never evidence.

Each evidence line carries:
- its date;
- its source (a path, URL, query or log line);
- what it shows.

Evidence read before the latest change to the thing it describes is stale. Re-read it.

### Problem-first for anything new
A new product or initiative starts from a documented, unresolved problem. It does not start from a channel, a format or a capability we happen to have. The entry bar, the test a new idea must pass first, is that the problem is:
- quoted from the people who have it;
- repeated, by at least 3 different authors in separate posts or threads;
- recent, within the last 12 months;
- unsolved: none of the alternatives you searched for is rated 4.3 or higher out of 5 in its store or site and claims to fix it. List the alternatives you searched.

Research into channels and formats comes afterwards, and it answers only where the fix would live and how it would bill. Look first in niches next to existing assets: a smaller problem that can be fixed well beats a bigger one that can't be reached.

### State the problem, not a solution
Write it as a job (research.md § Jobs-to-be-Done, with who, today and cost added):

> When [situation], [who] wants to [motivation], so they can [outcome]. Today [what happens instead], which costs [cost].

**Test:** if the outcome or the "today" part names a feature, a screen or a technology we would build, it is a solution in disguise. The situation may name the context, for example "on the phone at night". Rewrite it until several different solutions could answer it.

**Test:** the problem has happened. At least one evidence line shows a case of it: a log or record row, or a dated report of it occurring. Reading code and concluding it *could* happen is a hypothesis, and so is a person saying what *would have* happened; both go back to Discover to find a case, or to check the path the problem needs really exists. (2026-10-31: a judged-PASS proposal fixed a filter that inbound mail never passes through.)

### Diverge before converging
Before picking, list at least two options plus "do nothing". Compare all of them on the same criteria:
- the effect on the metric;
- cost;
- risk;
- reversibility;
- what each option rules out.

"Do nothing" is a real option with a real cost. If it wins, the intent closes. This rule fails when any option leaves a criterion blank, or when an option is dismissed in under one sentence.

These options are a cheap triage: go, no-go or do nothing. The full search for solutions stays in Develop.

### The hand-off to Define
Discover ends when the intent holds all of these:
- the evidence lines;
- the problem statement;
- a context map (research.md § Context map);
- the compared options;
- a metric with a target, each with its source, the baseline (the value today, or "none yet, new") and the date it was read.

Define then converges on one problem and one option to build, and writes the spec. An agent may draft all of it, but only a human yes moves the work to Build.

### Scored checks
These are judged on the intent or spec, with the evidence cited. They are N/A when the audit is pointed at no intent, or when it reads a screenshot only:

| Check | Passes when |
|---|---|
| DISC-EVIDENCE | At least 3 dated, sourced evidence lines, drawn from at least 2 of the input kinds above. Recall on its own fails |
| DISC-PROBLEM | The problem is stated as a situation and its cost, with no solution named in the outcome or the "today" part, and at least one evidence line shows it happening |
| DISC-DIVERGE | At least 2 options plus "do nothing" are compared on the same criteria before one is picked |
| DISC-PAIN | New products and initiatives only: the problem meets the entry bar above |
| DEF-METRIC | The metric and target name their source and the baseline (or "none yet, new"), with the date it was read |
| CTX-MAP | The context map rule, which applies here too |

**Example of a FAIL.** "Problem: the app needs a dark mode." That is a solution, it has no evidence and it compares nothing.

**Example of a PASS** (an existing product, so DISC-PAIN is N/A):

- **Problem:** "When people check the app in bed, they want to read it without waking themselves up, so they fall back to sleep. Today the screen is full-brightness white, which costs them sleep and costs us 1-star reviews."
- **Evidence:**
  - 2026-03-02, store reviews: 7 reviews in the last 6 months say it "blinds" them (each one quoted and dated).
  - 2026-03-02, analytics: 40 % of sessions start between 23:00 and 06:00.
  - 2026-03-03, desk research: the two closest competitors both switch to a dim red palette at night.
- **Options:**

  | Option | Metric effect | Cost | Risk | Reversible | Rules out |
  |---|---|---|---|---|---|
  | A night palette that follows the clock | large: every night session | 3 days | wrong hours for shift workers | yes | nothing |
  | A dimmer setting | small: only people who find it | 1 day | most people never find it | yes | nothing |
  | Do nothing | none | 0 | the reviews keep coming | yes | nothing |

- **Metric:** the share of night sessions that end within 2 minutes. Target 70 %. Source: analytics. Baseline 45 %, read in March.

---

## Design Sprint

### Origin
Developed by Jake Knapp at Google Ventures, published in "Sprint" (2016). A five-phase process for answering critical business questions through design and testing in compressed time.

### Why it exists
Most organizations can't run a full Double Diamond process for every decision — time, resources, and alignment don't allow it. The Design Sprint is a compression: it forces the full design thinking cycle into five structured days (or an equivalent compressed schedule), producing a tested prototype at the end rather than a finished product.

The key insight: you learn more from testing a realistic prototype for five days than from building a real product for three months without validation.

### The five phases

**Map (Monday — Discover/Define)**
Understand the long-term goal and the immediate challenge. Map the user journey. Identify the critical moment to focus on. Choose a target: one specific user and one moment in their journey that the sprint will solve for.

Convergence happens here: the team chooses one target, one user, one moment. The sprint only works if it's focused.

**Sketch (Tuesday — Develop)**
Individuals work independently to generate solution concepts. The process is structured to prevent groupthink and anchoring. Lightning demos (analogous inspiration from other domains), note-taking, idea maps, Crazy Eights (8 sketches in 8 minutes), then a detailed solution sketch.

Why individual: group brainstorming produces fewer and lower-quality ideas than individuals working alone and then sharing. The sprint respects this.

**Decide (Wednesday — Converge)**
The team reviews all sketches and makes decisions without debate: silent voting, heat maps, structured critique. The goal is a single storyboard that the prototype will be built from. Conflict is resolved by decision — not by compromise.

**Prototype (Thursday — Develop again, accelerated)**
Build a realistic-looking prototype in one day. The goal is not a finished product — it's something realistic enough that users will believe in it and react authentically. Facade > functionality. Tools: Figma, Keynote, Webflow — whatever produces the fastest credible artifact.

**Test (Friday — Deliver/Validate)**
Five user interviews. Watch real people interact with the prototype. The team watches together. Patterns emerge by the third interview. By the fifth, you know what works and what doesn't.

Five users is not statistically significant. It is, however, sufficient to reveal major usability failures — which are the things that matter most before committing to full development.

### The fractal dimension
A "sprint" doesn't require five days. The structure can be compressed into a half-day for a smaller problem, or expanded to two weeks for a more complex one. The essential discipline: all five phases must happen, in order, with genuine output at each stage. Skipping Sketch makes Decide arbitrary. Skipping Test makes the whole sprint speculation.

---

## Brand Sprint

### Origin
Developed at Google Ventures (Jake Knapp and team) as a compressed version of brand strategy consulting — typically run as a three-hour workshop to establish brand foundations before a longer design engagement. Documented in the GV library and "Sprint" materials.

### Why it exists
Design work built on undefined brand foundations is unanchored. Typography, color, tone, visual language — all of these should derive from a clear brand core. Without that core, every design decision is arbitrary, consistency is impossible, and the work can't be evaluated against meaningful criteria.

The Brand Sprint doesn't produce a finished brand. It produces the foundations: the minimum viable alignment that makes subsequent design decisions coherent.

### The brand essentials

**20-year roadmap**
Where is this brand/company/product going in the long term? What future are you building toward? This is not a financial forecast — it's a directional statement that grounds design decisions in a larger purpose. Decisions made without this anchor drift toward short-term optimization.

Questions: What does success look like in 20 years? What exists in the world because of this organization that wouldn't otherwise?

**What / How / Why**
- **What:** What do you do? (functional, literal)
- **How:** How do you do it differently or better? (the differentiating method)
- **Why:** Why does it matter? (the purpose beyond the product)

Simon Sinek's Golden Circle applied to brand. The Why is the hardest to articulate and the most important: it's what users connect with and what survives market changes.

**Top 3 values**
The three things the brand stands for that are not negotiable. Not aspirational values (things you'd like to be true) — foundational values (things that are actually true and that every decision will reflect). More than three becomes decorative; fewer may be insufficient. Three creates a usable decision filter: does this design decision reflect our values?

**Top 3 audiences**
Who are you primarily designing for? Not every possible user — the three primary audiences whose needs should drive design decisions when they conflict. Defined with enough specificity to make design choices: not "professionals" but "senior product designers at mid-size tech companies."

**Personality sliders**
Where does the brand sit on a set of opposing axes?
- Classic ↔ Modern
- Playful ↔ Serious
- Accessible ↔ Exclusive
- Established ↔ Emerging
- Warm ↔ Cool
- Simple ↔ Complex

The positions on these sliders directly inform visual language, motion character, typography, and copy tone. They are design inputs, not just marketing inputs.

**Competitive landscape**
Where does the brand sit relative to competitors on 2 dimensions? This is a perceptual map, not a feature comparison. It shows differentiation and identifies open positions. Design decisions that move the brand toward competitor positions are design failures — unless the strategy is to compete head-to-head.

### Foundation audit: the primary use in design work

The Brand Sprint's most important function is not producing a new brand — it's auditing whether foundations exist before design work proceeds.

Before any derived work (UI, copy, motion, components, product design, marketing), ask:
- Is the 20-year direction clear and shared?
- Can the team articulate what/how/why?
- Are there 3 agreed values that function as a decision filter?
- Is the audience defined specifically enough to make design choices?
- Do we have personality positions that inform visual language?
- Do we know where we sit in the competitive landscape?

If the answer to any of these is no, or "sort of," or "everyone has a different answer," surface that gap before proceeding. **Design built on undefined foundations cannot be evaluated, and drift and inconsistency are guaranteed.**

This applies to every derived design decision — not just brand work. A CSS decision about button corner radius should be traceable to personality sliders. A copy tone should be traceable to values and audience. An animation style should be traceable to personality (playful vs. serious, fast vs. deliberate). The chain should exist. The Brand Sprint ensures it does.

### From core to tokens: the derivation table
The foundation audit asks whether the chain exists. The derivation table is that chain written down at Define, before any surface. It has one row per primitive token family:

| Core item (Why, a value, an audience) | Slider position | Psychological link (mechanism, evidence strength) | Token decision |
|---|---|---|---|

Families that need a row:
- typefaces, in their display and text roles;
- the type-scale ratio;
- colour: hue, temperature, lightness, and the dark-mode variant;
- the spacing unit and rhythm;
- radius and line weight;
- motion duration and easing;
- imagery, when the surface shows photographs or illustrations: subject, distance, light, colour and the policy on faces and people. Photographs carry a brand as strongly as type does, and a stock photo picked at the surface undoes the table;
- copy tone.

A value with no row was picked at the surface. It was chosen because it looked right, so nothing can say when it is wrong.

Across the table, cover the three levels of Emotional Design (Norman):
- **Visceral:** what the colour, shape and type feel like at first glance.
- **Behavioural:** what the size, spacing and motion do to use: tap targets, reading rhythm, how responses feel.
- **Reflective:** what the choice says about the person using it, meaning the self-image the brand offers.

These are the psychological links, with how much each one can carry:
- **Typeface personality** (Brumberger 2003; Henderson, Giese & Cote 2004; Shaikh 2007). Readers agree reliably on broad traits such as elegant, friendly, sturdy or modern. They judge text as more fitting when the face matches the content. The evidence is moderate for broad traits and weak for fine differences between similar faces.
- **Curvature** (Bar & Neta 2006; Bertamini et al. 2016). Curved shapes are mildly preferred and read as safer and friendlier. Sharp angles read as precise or tense. The effect is small and robust, but context changes it.
- **Colour** (Elliot & Maier 2014; Labrecque & Milne 2012). Lightness and saturation carry arousal and warmth more reliably than hue does. Hue meanings are learned and depend on culture (see Colour Theory, cultural meaning). Treat hue associations as convention, and lightness and saturation as the stronger lever.
- **Proportion and rhythm** (Bringhurst, scales as musical intervals). A type scale built on one ratio reads as ordered. A tight ratio, such as the minor third (1.2), feels quiet. A wide one, such as the perfect fifth (1.5), feels dramatic. This is a craft convention, not an experimental finding, so say so.
- **Motion** (Disney timing; Material and Apple motion guidance). Duration and easing read as character. Short, eased motion reads as calm and competent; overshoot reads as playful. This is convention, and practitioner sources agree on it.
- **Processing fluency** (Reber, Schwarz & Winkielman 2004). What is easy to perceive is judged truer, likelier and more pleasant. The evidence is strong, and it is the general reason a consistent, coherent system matters at all.

The effects are small and depend on culture and context. The table records the reason and how strong it is. It does not pretend a radius proves a value. A row marked "convention" is honest. A row with no link is a gap.

A child brand is a template, a feature or a sub-product. It writes its own core and its own table, and says which parent values it inherits and which slider positions it moves. The token families it shares with the parent stay shared, and only the moved positions get new values.

### The fractal dimension
Brand Sprint principles apply at multiple scales. A product feature has a mini brand: what does it stand for, who is it for, how does it express the parent brand while doing something specific? A campaign has a brand moment: does it reflect the core or deviate from it? The same audit questions apply.

---

## Using Process Frameworks Together

The three frameworks are not separate processes — they are the same process at different scales and resolutions.

| Scale | Framework | Phases |
|---|---|---|
| Project / programme | Double Diamond | Discover → Define → Develop → Deliver |
| Sprint / workshop | Design Sprint | Map → Sketch → Decide → Prototype → Test |
| Brand / foundation | Brand Sprint | Roadmap → Values → Audience → Personality → Position |

**Key diagnostic questions:**
- Are we in diverge or converge mode right now? (If unclear — we're probably converging prematurely)
- Which phase of the Diamond are we in? Are we solving the right problem or the assumed problem?
- Do we have validated brand foundations, or are we building on assumptions?
- Is the sprint focused on one target, or are we trying to solve everything at once?

The process frameworks are most useful as a **diagnostic**, not a prescription. They help identify which kind of thinking is needed right now, and whether the team is stuck in the wrong mode.
