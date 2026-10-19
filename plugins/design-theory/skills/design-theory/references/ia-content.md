# Information Architecture & Content Design

## Rosenfeld & Morville — Four IA Systems

Information architecture is not navigation design. It's the structural design of shared information environments — the invisible scaffolding that makes information findable, understandable, and usable.

**The four systems:**

**Organization systems** — How information is categorized and structured.
- By time (schedule: chronological)
- By topic (by stage, by genre)
- By task (what do I want to do: find an act, plan my day, track health)
- By audience (first-timer vs. returning, sober vs. not)
- By metadata (artist country, stage capacity, genre tags)

The choice of organization scheme is not neutral — it reflects whose mental model of the information was centered. A schedule organized by stage assumes the user navigates by stage. One organized by time assumes they navigate by "what's happening now."

**Labeling systems** — How information is named and represented.
Labels are interface decisions. "Stage A" vs. "The Arc" vs. "Main Stage" are different labels for the same location — they carry different associations and map to different mental models. Every category name, button label, navigation item, and tooltip is a labeling decision. Microcopy *is* IA.

**Navigation systems** — How users move through the information space.
- Global navigation: always present, orients within the whole
- Local navigation: contextual, orients within a section
- Contextual navigation: links between related content
- Navigation parallel in physical-digital contexts: building entry (global), floor section (local), "related items nearby" (contextual)

Navigation design must account for both the app's structure *and* the physical environment the user navigates simultaneously. When the user is wayfinding in meatspace, the app's navigation must mirror and support that, not contradict it.

**Search systems** — How users look for specific things.
When the content set is large (80+ acts, 3-day schedule), search becomes critical. Search design includes: what can be searched, how results are ranked, what filters are available, how zero-results states are handled.

---

## Morville — Findability Honeycomb

Seven qualities that make information experiences valuable:

- **Useful** — Does it serve a real need?
- **Usable** — Can users accomplish their goals?
- **Desirable** — Is it emotionally resonant and appropriate?
- **Findable** — Can users locate what they need?
- **Accessible** — Does it work for people with disabilities?
- **Credible** — Is it trustworthy?
- **Valuable** — Does it deliver value to users and the organization?

**The aesthetic trap:** high-desirability design (ornate visual style, visual complexity, dark or high-contrast UI) frequently sacrifices findability. Beautiful but unfindable is a failure. Every aesthetic choice that competes with legibility must justify itself.

---

## UX Writing & Microcopy (Podmajersky, Richards)

Microcopy is not polish applied after design is done. It is design. Every word is a structural decision.

**Principles:**

**Write for scanning, not reading.** Users don't read interfaces — they scan for the words that match their current intent. Frontload the meaningful word: "Download report" not "Click here to download your report."

**Cut ruthlessly.** If removing a word loses no meaning, remove it. If a label needs a tooltip to be understood, the label is wrong. Count: a button that says "Submit form" has two words; the second is waste.

**Microcopy sets tone as much as visuals.** The same information can feel cold, warm, technical, playful, or urgent based entirely on word choice. "GOLDEN HOUR IN 01:23" is a different experience than "Golden hour begins in 1 hour 23 minutes" — not just aesthetically but in what it communicates about the system's personality.

**Error messages are conversations.** Not system states, not technical outputs — conversations with a user who is frustrated and needs help.
- Bad: "Error 404: Resource not found"
- Bad: "Something went wrong"
- Good: "Offline — your schedule is still available. Check connectivity to sync."
The formula: what happened, why (if useful), what to do next.

**When text is part of the aesthetic:** in strong-aesthetic interfaces (dark HUD, brutalist, terminal-style), text style IS the aesthetic. Uppercase, monospace, abbreviated, terse — these are content design decisions with design theory behind them. The text voice must cohere with the visual style; inconsistency creates dissonance even when each works individually.

**Empty states are first impressions.** An app with no data is a new user's first experience. The empty state is not an absence — it's an opportunity to orient, explain, and invite.

**Confirmation dialogs are a design smell.** If you need a confirmation, the action's consequences weren't clear enough before the user took it. The better fix is usually earlier signaling, not a modal asking "are you sure?"

---

## Content Strategy note

Content strategy operates at a scale above microcopy: what content exists, for whom, maintained how, governed by whom. For a personal tool, content strategy reduces to:
- What information does the user need in each context?
- What format serves that context? (push notification vs. dashboard vs. detail view)
- What goes stale and needs a freshness model? (schedule data, celestial positions)
- What is static? (UI labels, help content)

Most apps have a content lifecycle: before (planning), during (real-time active use), after (review, memory, follow-up). The content appropriate to each phase differs dramatically. Design the content model across the full lifecycle, not just the in-session view.
