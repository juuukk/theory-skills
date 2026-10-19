# Inclusion & Equity: WCAG + Universal Design + Dark Patterns

## WCAG — Web Content Accessibility Guidelines (POUR)

### Why it matters
WCAG provides the most widely adopted framework for making digital content accessible to people with disabilities. Rather than anchoring to a specific version (which evolves), the four foundational principles — Perceivable, Operable, Understandable, Robust — remain stable and are the right level of abstraction for design decisions.

Accessibility is not a checklist to clear before launch. It is a design quality. Inaccessible design excludes real users — permanently or situationally (a broken arm, bright sunlight, a noisy environment).

### The four principles (POUR)

**Perceivable**
Information and UI components must be presentable in ways users can perceive — regardless of sensory ability.

Key considerations:
- **Text alternatives:** Every non-text content (image, icon, chart, video) needs a text equivalent that serves the same purpose
- **Captions and transcripts:** Time-based media needs alternatives for users who can't hear or see it
- **Adaptable:** Content must be presentable in different ways without losing meaning (responsive, linearizable, semantic structure)
- **Distinguishable:** Make it easy to separate foreground from background — sufficient color contrast, audio control, no content that requires the ability to hear or see in a specific way

Audit questions: Can this page be navigated by someone who can't see the images? Can the information be conveyed without color? Does the contrast hold at the smallest text size used?

**Operable**
UI components and navigation must be operable by all users — regardless of input method or physical ability.

Key considerations:
- **Keyboard accessible:** All functionality available via keyboard (no mouse required). Focus order must be logical.
- **Enough time:** Users who need more time get it — no auto-expiring sessions without warning and option to extend
- **Seizures and physical reactions:** No content that flashes more than 3 times per second (photosensitive epilepsy)
- **Navigable:** Ways to help users find content, know where they are: skip links, page titles, headings, labels
- **Input modalities:** Support multiple input types — keyboard, touch, pointer, voice

Audit questions: Can every interactive element be reached and operated with keyboard only? Is focus always visible? Are there time limits that would exclude slow users?

**Understandable**
Information and operation of UI must be understandable.

Key considerations:
- **Readable:** Language of content is identified. Unusual words, abbreviations, and jargon are explained
- **Predictable:** Pages behave in predictable ways — consistent navigation, no unexpected context changes on focus or input
- **Input assistance:** Users are helped to avoid and correct mistakes — labels, instructions, error identification, error suggestions, error prevention for consequential actions

Audit questions: Are error messages in plain language with specific guidance? Are form fields labeled (not just placeholder text, which disappears)? Do interactive components behave consistently?

**Robust**
Content must be robust enough to be reliably interpreted by a wide variety of user agents, including current and future assistive technologies.

Key considerations:
- **Compatible:** Use standard, well-formed HTML/ARIA. Assistive technologies depend on semantic markup to interpret and communicate interface structure to users.
- **Status messages:** Programmatically determined status (errors, confirmations, progress) so they can be announced by screen readers without requiring focus

Audit questions: Does this use semantic HTML elements for their intended purpose? Are ARIA roles used correctly? Does it work with a screen reader?

### Design-level implications
- Don't design contrast ratios — design legibility. The principle is that text must be readable by low-vision users; the specific ratio is an operationalization of that principle that will evolve.
- Don't design for compliance. Design for the widest range of real users. Compliance follows.
- Test with keyboard. Test with a screen reader (VoiceOver, NVDA). Test at 200% zoom. These are not edge cases.

---

## Universal Design

### Why it matters
Universal Design, developed by Connell and colleagues at NC State (1997), describes the intent of designing for the full spectrum of human ability from the start — not as a retrofit for edge cases. Where WCAG is a compliance framework for digital accessibility, Universal Design is a design philosophy that predates and transcends digital: it originated in architecture and physical products.

The distinction matters: WCAG tells you whether you pass a test. Universal Design asks whether you designed for everyone from the beginning.

### The seven principles

**1. Equitable use**
The design is useful to people with diverse abilities. The same means of use for all users when possible; equivalent when not. Avoids segregating or stigmatizing any users. Equally private, secure, and safe for all. Example: powered doors with motion sensors benefit wheelchair users, parents with strollers, anyone carrying something, everyone.

**2. Flexibility in use**
The design accommodates a wide range of individual preferences and abilities. Provides choice in methods of use. Accommodates right- and left-handed access and use. Facilitates accuracy and precision. Provides adaptability to the user's pace. Example: scissors with symmetric handles that work for either hand.

**3. Simple and intuitive use**
Easy to understand regardless of experience, knowledge, language skills, or current concentration level. Eliminates unnecessary complexity. Consistent with user expectations and intuition. Accommodates a wide range of literacy and language skills. Arranges information consistent with its importance. Example: clear wayfinding graphics that don't require reading.

**4. Perceptible information**
The design communicates necessary information effectively to the user regardless of ambient conditions or the user's sensory abilities. Uses different modes (pictorial, verbal, tactile). Provides adequate contrast between essential information and surroundings. Maximizes legibility of essential information. Differentiates elements so instructions can be given simply. Example: temperature labels on hot and cold taps in both text and color — and texture.

**5. Tolerance for error**
The design minimizes hazards and the adverse consequences of accidental or unintended actions. Arranges elements to minimize hazards and errors (high-use elements accessible; hazardous elements eliminated, isolated, or shielded). Provides warnings of hazards and errors. Provides fail-safe features. Discourages unconscious action in tasks requiring vigilance. Example: undo. Confirmation for destructive actions. Autosave.

**6. Low physical and cognitive effort**
The design can be used efficiently and comfortably and with minimum fatigue. Allows user to maintain a neutral body position. Uses reasonable operating forces. Minimizes repetitive actions. Minimizes sustained physical effort. In digital: minimizes the number of steps, decision points, and required memory. Example: smart defaults. Form autofill. Persistent state.

**7. Size and space for approach and use**
Appropriate size and space is provided for approach, reach, manipulation, and use regardless of user's body size, posture, or mobility. In digital: target sizes, spacing between interactive elements, layout that accommodates zoom and reflow. Example: sufficient tap target size and spacing on mobile.

### Universal Design vs. WCAG
These are complementary, not competing:
- WCAG: "Does this meet the threshold?" — compliance and audit
- Universal Design: "Did we design for everyone from the start?" — intent and process

An interface can pass WCAG and still fail Universal Design (technically accessible but requiring workarounds). An interface can embody Universal Design principles and not be formally tested against WCAG.

---

## Dark Patterns

### Why it matters
Harry Brignull coined "dark patterns" in 2010 to name a specific class of design decisions: interfaces deliberately crafted to trick users into actions they didn't intend, to extract value from them, or to serve the business at the user's expense. Dark patterns are a design ethics issue, a legal issue (increasingly regulated in EU, US, and elsewhere), and a trust issue.

This framework is primarily used as an **adversarial audit lens**: examining your own or a third party's design for manipulative patterns, whether deliberate or accidental.

### The patterns

**Trick questions**
Confusing opt-in / opt-out language, double negatives, or pre-checked boxes that trick users into consenting to something they didn't intend. Example: "Uncheck this box if you don't want to not receive marketing emails."

**Sneak into basket**
Adding items to a user's purchase without clear consent. Often achieved through pre-selected add-ons or fine-print inclusions that users don't notice. Example: travel booking sites that pre-select seat upgrades or travel insurance.

**Roach motel**
Easy to get into a situation; deliberately difficult to get out. Subscription flows with a prominent sign-up and a hidden cancellation process. Example: account deletion buried in settings, requiring contact with customer support.

**Privacy zuckering**
Tricking users into sharing more personal information than they intend, or making privacy settings confusing enough that users give up and share everything. Named for a specific historical pattern of Facebook's design.

**Misdirection**
Drawing the user's attention deliberately away from important information. Often achieved through visual hierarchy: make the preferred option (for the business) visually dominant; make the user's preferred option small, grey, and easy to miss. Example: subscription vs. one-time purchase options designed to make subscription feel like the only real choice.

**Hidden costs**
Revealing charges, fees, or conditions only at the last step of a purchase flow. By that point, users have invested time and are less likely to abandon. Example: resort fees, booking fees, mandatory tips revealed at checkout.

**Bait and switch**
Advertising one thing and delivering another. Example: "Free" in the headline; pricing buried in terms. Or: a UI element appears to do X; actually does Y.

**Confirmshaming**
Using guilt or shame to pressure users into a decision. Typically appears as a two-option dialog where the decline option is written to make the user feel bad about declining. Example: "Yes, I want to save money" / "No thanks, I prefer paying full price."

**Disguised ads**
Advertising content designed to look like editorial content, navigation, or download buttons. Misleads users about what they're interacting with.

**Forced continuity**
Charging a user after a free trial ends without adequate warning. The business decision to make cancellation harder than sign-up.

### Audit approach
Run this as a deliberate adversarial pass: assume a bad actor designed this interface to extract value from users. What would they do? Then check whether any of those patterns exist — not because they were necessarily deliberate, but because they might have emerged from business pressure, metric optimization, or inattention.

Also audit for **dark pattern emergence**: interfaces that weren't designed with dark patterns in mind but evolved toward them through conversion optimization, A/B testing for short-term metric gains, and feature accumulation. The test: does this design respect the user's actual intent and interest, or does it redirect them toward the business's interest?

### Audit questions
- Are there any pre-selected options that benefit the business over the user?
- Is it as easy to leave/cancel/opt-out as it was to join/purchase/opt-in?
- Does the visual hierarchy serve the user's goals or the business's goals?
- Are all costs, terms, and conditions visible before the user commits?
- Is any advertising or sponsored content clearly distinguished from editorial or navigation?
- Would this design look the same if the user and the business had identical interests?
