# Interactive Systems & Game Design

## MDA Framework (Hunicke, LeBlanc, Zubek)

**Mechanics → Dynamics → Aesthetics.** The only rigorous vocabulary for how interactive systems generate the experiences they generate.

- **Mechanics:** The rules. The verbs. What the system allows and disallows.
- **Dynamics:** What emerges when players engage with those rules — patterns, strategies, tensions not explicitly designed.
- **Aesthetics:** The emotional responses that result — sensation, fantasy, narrative, challenge, fellowship, discovery, expression, submission.

Design works **backward**: define the desired aesthetic, design dynamics that produce it, write mechanics that generate those dynamics. Most bad game design happens because designers work forward (adding mechanics) without knowing what aesthetic they're targeting.

From the player/user side: mechanics are what you do; dynamics are what you experience doing it; aesthetics are how it feels.

---

## Csikszentmihalyi — Flow Theory

**Flow state:** full immersion, effortless attention, intrinsic reward. Time distortion, loss of self-consciousness, the sense that activity is its own reward.

**Conditions for flow:**
1. Clear goals (the user knows what success looks like at every moment)
2. Immediate feedback (the system responds to actions without delay)
3. Balance between challenge and skill (the narrow channel between boredom and anxiety)

The channel is narrow. Too easy → boredom → disengagement. Too hard → anxiety → withdrawal. Flow lives in the moving edge where skill is always being stretched but never overwhelmed.

**Design implications:**
- Don't interrupt flow with friction (confirmations, redirections, loading states)
- Don't let the system go silent — no feedback = anxiety
- Scale difficulty with mastery — what was challenging becomes easy; the system must introduce new complexity to stay in the channel
- For ambient or overlay tools: induce flow in the primary activity, not in using the tool itself. The tool that takes you out of flow to interact with it has failed. → see Weiser below.

*Note: Flow overlaps with SDT (references/behavioral.md). Flow describes the state; SDT describes the psychological needs that sustain motivation toward it. Cross-reference deliberately.*

---

## Raph Koster — A Theory of Fun

**Fun is the feeling of learning a pattern.** Not novelty. Not reward. Learning.

The brain responds with pleasure when it recognizes a new pattern — when the structure of a system becomes legible. This is why tutorial sections feel satisfying and mastered games feel boring. Mastery kills fun by eliminating the learning signal.

**Implication for design:**
- Good interactive systems introduce complexity at the rate the player can absorb it
- Once a system is fully mastered, engagement drops — this is expected and not a failure, but you must plan for it
- Randomness (roguelikes, procedural variation, drift mechanics) extends the learning curve by ensuring the pattern never becomes fully known
- For a gamification layer: the drift/randomness mechanic should feel like *discovery* (new pattern emerging), not *noise* (random punishment)

---

## Bartle's Player Types

Four types defined by what players seek from interactive systems:

| Type | Want | Fear |
|------|------|------|
| **Achievers** | Complete goals, earn rewards, finish the system | Pointless activity |
| **Explorers** | Discover systems, find edges, understand structure | Walls and limits |
| **Socialisers** | Interact, connect, share experience | Isolation |
| **Killers** | Dominate, impose on others, rank | Irrelevance |

Most systems have all four in the audience. Designing for one type at the expense of others creates a lopsided experience.

**For a personal tool:** the primary user is Explorer + Achiever — design for discovery (what else does this do?) and satisfying completion (I finished the daily loop). Socialiser and Killer motivations are largely absent in a single-user tool.

---

## Variable Ratio Reinforcement (Skinner)

Unpredictable reward timing produces the strongest and most persistent behavior — stronger than fixed-ratio (every 5th action) or fixed-interval (every hour). The mechanism behind slot machines, social media feeds, and loot boxes.

**Why it works:** predictable rewards allow the brain to stop anticipating. Unpredictable rewards keep anticipation permanently elevated.

**Know this framework whether you're using it deliberately or auditing for accidental use:**
- Deliberately: use variable ratio to make exploration feel rewarding (random discoveries, rare events)
- Audit: if you're adding a badge, notification, or reward — is it on a variable ratio? Is that intentional?
- Dark pattern territory: variable ratio reinforcement in a tool designed to help users is fine; in a tool designed to extract attention, it's manipulation

---

## Weiser — Calm Technology

*"The most profound technologies are those that disappear. They weave themselves into the fabric of everyday life until they are indistinguishable from it."* — Mark Weiser, Xerox PARC, 1991

**Three levels of attention:**
1. **Center:** what you're actively focused on right now
2. **Periphery:** what you're aware of but not attending to — ambient, background
3. **The move between them:** how information transitions from peripheral to central attention without jarring

**Calm technology principle:** the best systems live at the periphery until needed, then move to center *without disrupting.* Bad technology permanently demands center attention.

**Eight principles of calm technology (Weiser & Brown):**
1. Technology should require only as much attention as is necessary
2. Technology can communicate without demanding focus
3. Technology should amplify the best of technology and humanity
4. Technology can communicate through the periphery
5. Technology that flows between background and foreground should not cause anxiety
6. Technology should make use of the periphery
7. The right amount of technology is the minimum needed to solve the problem
8. Technology should work even when it fails

For ambient and overlay tools, this is the philosophical spine. Every notification, readout, and overlay should pass the calm technology test: does it live at the periphery until the user needs it? Does it move to center without jarring? Does it enhance what the user is actually doing, or compete with it?

A notification that buzzes once and fades = calm. A notification that requires acknowledgment and clears a modal = not calm.

---

## Game Theory sidebar

Game theory applies when **multiple parties** are involved with partially conflicting interests. For single-user tools, largely irrelevant. For platforms:

**Nash equilibrium:** a state where no party can improve their outcome by unilaterally changing strategy. Platforms often engineer Nash equilibria that favor the platform: users can't individually escape a default (share your data) even though all users would prefer a world where no one shares.

**Prisoner's dilemma in UX:** dark patterns often work because they create prisoner's dilemma structures — the rational individual choice (accept cookies) produces a collectively bad outcome (universal surveillance), but no individual has incentive to resist.

**Mechanism design:** designing rules such that self-interested behavior produces desired collective outcomes. Applied to gamification: how do you design rewards so that users pursuing their own goals also produce the system behavior you want?

*Use when: auditing platform incentive structures, designing multi-user features, or analyzing why a design feels coercive despite being optional.*
