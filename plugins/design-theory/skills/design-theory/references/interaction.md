# Interaction Frameworks: Nielsen + Laws of UX + Norman's Laws + Cognitive Load

## Nielsen's 10 Usability Heuristics

### Why it matters
Nielsen's heuristics are the most widely validated evaluation framework for interactive systems. They emerged from factor analysis of usability problems across many interfaces and have held up for decades precisely because they describe fundamental properties of human-computer interaction, not interface fashions.

### The 10 heuristics in depth

**1. Visibility of system status**
Users should always know what is happening. Feedback should be immediate, appropriate, and clear. Common failures: no loading state during async operations; no confirmation after form submission; upload progress with no indicator. Fix: every state change needs a visible signal.

**2. Match between system and the real world**
Speak the user's language. Use words, phrases, and concepts familiar to the user — not internal system terminology. Order information naturally, the way users think about the task. Common failure: database field names surfaced as UI labels; error codes instead of plain language.

**3. User control and freedom**
Users make mistakes. They need clearly marked emergency exits: undo, cancel, go back. Don't force users through long sequences without escape. The cost of supporting undo is almost always lower than the cost of users feeling trapped.

**4. Consistency and standards**
Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions. Invent new patterns only when existing ones genuinely fail the task. Common failure: three different labels for the same action across a product.

**5. Error prevention**
Design to prevent problems from occurring in the first place. Confirm before destructive actions. Constrain inputs to valid values. Disable options that don't apply rather than surfacing errors after submission. Prevention beats recovery.

**6. Recognition over recall**
Minimize memory load. Make options, actions, and information visible. Don't make users remember information from one part of an interface to use it in another. Menus are better than command lines; autocomplete is better than blank fields.

**7. Flexibility and efficiency of use**
Accelerators — shortcuts, saved preferences, smart defaults — let experienced users move faster without burdening novices. Allow users to tailor frequent actions. Common tension: designing only for the novice path vs. only for power users. Design for both.

**8. Aesthetic and minimalist design**
Every extra element competes with every other for attention. Irrelevant or rarely needed information dilutes the relevant. This doesn't mean flat or empty — it means intentional. Every element should earn its place.

**9. Help users recognize, diagnose, and recover from errors**
Error messages should be in plain language (no codes), precisely indicate the problem, and constructively suggest a solution. Don't blame the user.

**10. Help and documentation**
Better if the system doesn't need documentation, but when it does: make it searchable, context-sensitive, task-focused, and concrete.

### Audit approach
Evaluate each flow against each heuristic. Flag violations by severity: cosmetic, minor, major, catastrophic. Don't audit for completeness — audit for impact.

---

## Laws of UX

### Why it matters
Yablonski's compendium draws from cognitive psychology, behavioral economics, and HCI research. These are not design opinions — they are empirically observed properties of human perception and decision-making. Designing against them is designing against users.

### Laws in depth

**Fitts's Law**
Time to acquire a target = log(distance / size + 1). Practical implications:
- Make interactive targets large enough to hit easily, especially on mobile
- Place controls close to where the user's attention already is (don't bury the primary action at the bottom of a long form)
- The corners and edges of screens are easy targets (infinite size in one direction) — use them for persistent actions
- Never make a critical action small and far from context

**Hick's Law**
Decision time grows logarithmically with the number of choices. Practical implications:
- Reduce the number of options visible at once
- Use progressive disclosure: show the most common choice; reveal advanced options on demand
- Highlight the recommended or default option to shortcut deliberation
- Menus with 5 items are faster to scan than menus with 20

**Jakob's Law**
Users spend most of their time on other interfaces. They expect your interface to work the way others work. Familiarity reduces cognitive load. Deviate from convention only when:
1. There is a clear functional benefit
2. The deviation is consistent throughout
3. The user can learn it once and apply it everywhere in your system

**Miller's Law**
Working memory holds approximately 7 (±2) chunks of information at once. Practical implications:
- Chunk lists, navigation, and forms into groups
- Don't surface more than ~7 items in a flat list without grouping
- Paginate, collapse, or progressive-disclose information-dense content
- The limit applies to chunks, not individual items — grouping beats reducing

**Peak-End Rule**
Users judge an experience primarily by how it felt at its peak (most intense moment, positive or negative) and at its end. The average across the experience matters far less. Implications:
- Design the peak moment intentionally: what is the best possible payoff in this flow?
- Design the end: don't let successful tasks close with an anticlimactic blank page
- The most painful moment in a flow disproportionately shapes memory — eliminate or soften it

**Aesthetic-Usability Effect**
Aesthetically pleasing interfaces are perceived as easier to use, even when they're not functionally superior. Users are more tolerant of minor usability problems in beautiful interfaces. Practical implication: visual quality is not decoration — it buys goodwill and patience. But it doesn't mask major usability failures.

**Von Restorff Effect**
An item that stands out from its peers is most likely to be remembered. Practical implications:
- Use visual distinctiveness intentionally: the one thing that should stand out
- If everything is highlighted, nothing is
- Used well: primary CTA stands out from secondary options. Used badly: alerts, badges, and call-outs competing for distinction until none of them work.

**Tesler's Law (Law of Conservation of Complexity)**
Every application has an inherent amount of complexity. It cannot be eliminated — only moved between the user and the system. The design question is: who bears it? Systems that absorb complexity (smart defaults, automation, intelligent sequencing) reduce user burden. Systems that expose complexity (configuration UIs, verbose settings, manual steps) shift the burden to users.

**Doherty Threshold**
System response under 400ms keeps the user in psychological flow. Above that, attention begins to wander and the user disengages. Implications: optimize perceived performance with optimistic UI, skeleton loading, and progress indicators where response times can't be reduced.

**Postel's Law (Robustness Principle)**
Be liberal in what you accept from users; be strict in what you output. Accept varied input formats gracefully (phone numbers with or without dashes; dates in multiple formats). Don't make users conform to system constraints they shouldn't need to know about.

---

## Norman's Laws (DOET)

### Why it matters
Norman's framework from "The Design of Everyday Things" provides a vocabulary for diagnosing why interactions break down. Where Nielsen describes what good looks like, Norman explains why poor interactions fail at a fundamental level.

### Concepts in depth

**Affordances**
The actual properties of an object that determine how it can be used. A button affords pressing. A slider affords sliding. A link affords clicking. The question: does the affordance match what you want the user to do? Common failure: using a div styled to look like a button — it has the visual appearance but lacks the native affordance (keyboard focus, click handling, semantic role).

**Signifiers**
What makes affordances discoverable. A button's raised appearance signifies it can be pressed. An underline signifies a link. Signifiers communicate "this is where the action is." Common failure: flat design that removes visual signifiers, leaving users to discover interactive elements by trial and error.

**Constraints**
Limits on possible actions. Physical constraints (can't insert USB wrong way). Logical constraints (greyed-out options that don't apply). Cultural constraints (conventions users follow by habit). Semantic constraints (meaning-based — a submit button at the end of a form, not at the beginning). Design: use constraints to prevent errors before they happen.

**Mappings**
The relationship between controls and their effects. Natural mappings feel obvious and don't require learning. A scroll gesture that moves content in the direction of the gesture is a natural mapping. Volume sliders that go up for louder are natural mappings. Unnatural mappings require users to learn and remember an arbitrary relationship — a design debt that never goes away.

**Feedback**
Every action should produce an immediate, clear result so users know: did it work? what happened? what's next? Delayed, ambiguous, or missing feedback forces users to repeat actions or abandon flows. Common failure: form submission with no visible response; button that appears to do nothing for 3 seconds before loading.

**Conceptual models**
The user's mental model of how the system works. The design's job is to communicate an accurate conceptual model through interface, behavior, and language. When the user's model diverges from reality, unexpected behavior causes frustration and errors. Good: file system as folders and files (a metaphor that accurately communicates hierarchy). Bad: any interface where users can't predict what will happen before they act.

### Audit questions
- Can users discover all interactive affordances without trial and error?
- Do controls have natural mappings to their effects?
- Is feedback immediate and unambiguous for every action?
- Does the interface communicate an accurate conceptual model?

---

## Cognitive Load Theory

### Why it matters
Sweller's Cognitive Load Theory, from educational psychology, describes how working memory has limited capacity. Design that ignores this creates interfaces that users can't process — not because users are incapable, but because the design is asking too much at once.

### Three types of load

**Intrinsic load**
The inherent complexity of the content itself. A tax form is complex because taxes are complex. A circuit diagram is complex because electronics are complex. Intrinsic load can't be eliminated — but it can be managed by chunking, sequencing, and progressive disclosure. Design question: are we exposing all the complexity at once, or staging it appropriately?

**Extraneous load**
Complexity introduced by poor design: confusing layouts, inconsistent labeling, irrelevant information, unnecessary steps, unclear navigation. This load adds nothing to the user's goal — it's pure friction. Design goal: eliminate all extraneous load.

**Germane load**
The effort a user spends building mental models and schemas — actually learning the system. This is useful cognitive work. Good design supports it: consistent patterns that generalize, clear feedback that teaches, behavior that rewards exploration. Design goal: reduce extraneous load to free capacity for germane load.

### Warning signs of high extraneous load
- Multiple competing calls to action visible at the same time
- Information required in step 3 only shown in step 1
- Labels that don't match the mental model ("Submit inquiry" vs. "Send message")
- No chunking in long forms — all fields on one screen
- Inline instructions that explain a confusing interaction rather than fixing the interaction
- Error messages that describe system state rather than what the user should do next

### Audit questions
- What is the intrinsic complexity of this content, and is the interface managing it with chunking and sequencing?
- What extraneous complexity has design introduced that could be eliminated?
- Are patterns consistent enough that users can build a mental model that generalizes?
- How many active decisions is the user being asked to make simultaneously?
