# Behavioral Design & Motivation

## Fogg Behavior Model

**B = MAP:** Behavior happens when Motivation, Ability, and Prompt converge at the same moment. If any one is absent, the behavior doesn't occur.

```
Behavior = Motivation × Ability × Prompt (simultaneous)
```

**Motivation:** how much the person wants to do this right now. Affected by: anticipated pleasure/pain, hope/fear, social acceptance/rejection.

**Ability:** how easy it is to do this right now. Six factors: time, money, physical effort, mental effort, social deviance, non-routine. The simplest path is the one that removes the most of these.

**Prompt:** the trigger — notification, visual cue, internal reminder. Without a prompt, no behavior even if motivation and ability are maxed.

**Common failure mode:** high-motivation users receive prompts when ability is low. The user wants to hydrate (motivation high), but the reminder fires when they're mid-dance with phone in pocket (ability low). The behavior doesn't happen — not because of motivation failure, but because the moment was wrong.

**Design implication:** match prompt timing to peak ability windows, not just high motivation moments. A notification that fires when the user is cognitively occupied (driving, in a meeting, mid-task) will be ignored regardless of motivation. The same reminder firing during a natural pause — transition, waiting, just finished something — lands when ability is high.

**Fogg's corollary:** if a behavior isn't happening, diagnose which of M, A, P is missing before assuming motivation is the problem. Most design effort goes into increasing motivation (better copy, better UX) when ability or prompt is the actual gap.

---

## Self-Determination Theory (Deci & Ryan)

Three innate psychological needs that, when satisfied, produce intrinsic motivation:

**Autonomy** — I chose this. The behavior originates from me, not external pressure. Even perceived autonomy matters: being told to do something you'd have chosen anyway feels different from choosing it.

**Competence** — I'm good at this. I can meet the challenges I encounter. Feedback that confirms skill development satisfies competence. Feedback that signals failure without a path to improvement violates it.

**Relatedness** — I belong here. The activity connects me to others or to something larger. For single-user tools, relatedness is the need most often unmet — and often least important to address.

**Intrinsic vs. extrinsic motivation:**
- Intrinsic: motivated by the activity itself (curiosity, enjoyment, meaning)
- Extrinsic: motivated by separable outcomes (rewards, avoiding punishment, social approval)
- Extrinsic motivation is not inherently bad — it can be internalized and become autonomous
- The danger: adding extrinsic rewards to intrinsically motivated activities can *undermine* intrinsic motivation (over-justification effect)

**Gamification that works vs. fails:**
- Works: points and badges that reflect genuine competence growth and offer meaningful autonomy (you chose how to earn them)
- Fails: points and badges applied externally to behavior the user already cared about — these crowd out intrinsic motivation once the rewards stop

*Note: Flow (references/systems.md) describes the experiential state SDT's competence + autonomy tend to produce. SDT explains why the state is intrinsically rewarding; Flow explains what the state feels like and how to sustain it.*

---

## Nudge Theory (Thaler & Sunstein)

**Choice architecture:** the design of the environment in which decisions are made. Small structural changes that predictably alter behavior without restricting options or changing incentives.

**Not manipulation:** nudges preserve full freedom of choice. The goal is to reduce friction in the right direction, not to deceive or coerce.

**Key mechanisms:**
- **Defaults:** the most powerful nudge. The pre-selected option is chosen by a majority who never actively decide. Design defaults as if they're your recommendation.
- **Framing:** the same fact, different frames, different choices. "90% survival rate" vs "10% mortality rate" produce different responses to identical information.
- **Salience:** what's visible at the moment of decision shapes what gets chosen. Show the healthy option first.
- **Social norms:** "most people in this building recycle" outperforms moral arguments for recycling.
- **Commitment devices:** ways to make future desired behavior more likely by committing now.

**Libertarian paternalism:** make the desired behavior the default; make the undesired behavior possible but effortful. Not restricting choice — restructuring its presentation.

Default notification timing to low-friction moments (transitions, natural breaks in activity). Default views to the most contextually relevant state — "what's happening soon" rather than the full grid — reduce decision load when cognitive resources are already claimed.

---

## Cialdini — Six Principles of Influence (audit lens)

Six mechanisms by which people are persuaded. Know them whether you're using them or auditing for accidental or adversarial use.

**Reciprocity:** people repay what they receive. Unsolicited gifts create felt obligation. Used well: give value first. Used badly: manufactured obligation to create compliance.

**Commitment and consistency:** people act consistently with prior commitments, especially public ones. Small initial commitments escalate. Used well: ask for small steps before large ones (onboarding). Used badly: foot-in-the-door manipulation.

**Social proof:** people look to others' behavior under uncertainty. "Popular choice" labels, review counts, user numbers. Used well: signal genuine adoption. Used badly: fake social proof, manufactured consensus.

**Authority:** people defer to perceived experts and legitimate authorities. Used well: cite genuine expertise. Used badly: fake credentials, implied authority.

**Liking:** people are more easily influenced by people they like. Used well: authentic, warm communication. Used badly: simulated friendship to lower defenses.

**Scarcity:** perceived rarity increases perceived value. "Only 3 left" drives urgency. Used well: reflect genuine scarcity. Used badly: manufactured urgency (fake countdown timers).

**Adversarial self-audit:** before shipping a persuasion pattern, name which principle it uses and whether the premise is true. If it's based on a false premise, it's a dark pattern.

---

## Quantum Cognition sidebar

Quantum cognition (Busemeyer & Bruza) applies quantum probability formalism to human judgment — not as metaphor, but as a mathematical model that outperforms classical probability on specific decision-making phenomena.

**Why classical probability fails to describe human judgment:**
- **Conjunction fallacy:** people rate "Linda is a bank teller who is also a feminist" as more probable than "Linda is a bank teller" — impossible in classical probability
- **Order effects:** the order of questions changes answers in ways classical models can't explain
- **Disjunction fallacy:** people violate the sure-thing principle under uncertainty

Quantum probability models these violations accurately because quantum probability allows superposition — a person can hold genuinely indeterminate preferences that collapse into a definite state only when forced to choose.

**Design implication:** users don't have stable, pre-formed preferences that design merely reveals. Preferences are often constructed at the moment of decision, shaped by the choice architecture they encounter. This is why defaults, framing, and order matter so much — you're not just presenting options, you're participating in the formation of preference.

*Use when: designing complex decision flows, evaluating why users make "irrational" choices, or justifying why contextual framing matters beyond mere presentation aesthetics.*
