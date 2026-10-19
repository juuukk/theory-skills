# Perceptual Frameworks: Gestalt + Color Theory + Typography

## Gestalt Principles

### Why it matters
Gestalt theory describes how the human visual system groups elements into perceived wholes. Users don't see individual elements — they see relationships, patterns, and structures. Design that fights these patterns creates cognitive friction; design that works with them feels effortless.

### Principles in depth

**Figure-Ground**
Every visual field is read as objects (figure) against a background (ground). Ambiguity here is confusing — users need to know immediately what to act on. Common failures: content areas and UI chrome competing for figure status; low-contrast interactive elements that blend into ground; modals without sufficient separation from page content.

**Proximity**
Elements close to each other are perceived as belonging together. Grouping in proximity should reflect actual relationships. Common failure: labels placed equidistant between two inputs — users associate them with the wrong control. Fix: tighten the space between a label and its field; increase space between groups.

**Similarity**
Elements sharing visual attributes (color, shape, size, texture) are perceived as a group. Used to communicate type: all primary buttons look alike; all destructive actions share a color. Common failure: using a primary button color for decorative elements — users expect them to be interactive.

**Continuity**
The eye follows smooth paths and lines. Alignment creates invisible rails that guide attention. Broken alignment — even by a few pixels — registers as visual noise. Used in: reading direction, scan paths, grid alignment.

**Closure**
The mind completes incomplete shapes. Used in: icon design, progress indicators, logo construction. Can be used to create implied structure without drawing every line (negative space works).

**Common fate**
Elements moving together are perceived as a group. In UI: animating a set of items together communicates they are related. Animating one item out of a group communicates separation.

**Symmetry and order**
Symmetrical compositions are perceived as stable, organized, and trustworthy. Asymmetry draws the eye and creates dynamism, but at the cost of visual tension.

### Audit questions
- Do proximity groupings reflect actual information relationships?
- Does visual similarity communicate interactive affordance accurately?
- Are scan paths (continuity) aligned with the intended reading order?
- Is figure-ground contrast sufficient for all interactive elements?

---

## Color Theory

### Why it matters
Color communicates before users consciously process it. It creates hierarchy, conveys meaning, triggers emotional response, and — when misused — creates accessibility failures and cultural misreadings.

### Harmony

**Complementary:** Opposite on the color wheel. High contrast, energetic, can be overwhelming at full saturation. Often used with one dominant color and one accent.

**Analogous:** Adjacent on the color wheel. Low contrast, harmonious, easy on the eye. Risk: low differentiation — hard to use for hierarchy.

**Triadic:** Three evenly spaced. Vibrant and balanced. Requires careful management of saturation to avoid visual chaos.

**Split-complementary:** One base + two colors adjacent to its complement. High contrast with more visual tension than analogous, less harsh than full complementary.

**Monochromatic:** Single hue in multiple tints/shades/tones. Elegant, cohesive, limited in expressive range. Works well for minimal or premium brands.

### Contrast

**Luminance contrast** carries information reliably across all users and conditions. Hue contrast alone fails for colorblind users and low-contrast displays.

**Hierarchy through value:** Darken or lighten — don't rely on hue shift alone to show importance.

**Simultaneous contrast:** Colors appear to shift when placed next to each other. A gray on an orange background looks blue. Account for this in UI where colors sit adjacent.

### Temperature

Warm colors (red, orange, yellow) advance visually and feel energetic, urgent, or inviting. Cool colors (blue, green, violet) recede and feel calm, trustworthy, or distant. Temperature is a tool for focus: warm for calls to action, cool for informational backgrounds.

### Cultural meaning

Color meaning is not universal. White = purity in Western contexts, mourning in parts of Asia. Red = danger in some contexts, luck in others. Green = go, safety, health in Western UI conventions, but associations vary. Always validate color meaning against the target market.

### Accessibility intersection

- Sufficient contrast between text and background at all sizes (refer to WCAG POUR principles, not version-specific ratios — the principle is: legibility for low-vision users at all sizes)
- Don't use color as the only means of conveying information (status, errors, grouping) — always pair with shape, label, or pattern
- Test palettes in grayscale and with colorblindness simulation

### Audit questions
- Does the palette use luminance contrast (not just hue) to convey hierarchy?
- Is any information conveyed only through color?
- Has cultural meaning been validated for the target market?
- Does the palette hold up in grayscale and under colorblindness simulation?

---

## Typography Hierarchy

### Why it matters
Typography is the primary carrier of information. Visual hierarchy in type — when done correctly — is invisible: users move through content at the right pace, find what they need, and feel the brand voice without consciously noticing type at all. When done poorly, everything competes and nothing is found.

### Scale

Size contrast creates hierarchy. If every text element is close in size, nothing reads as more important than anything else. A healthy scale has distinct steps: display, headline, subheading, body, caption. The steps should be perceivably different — not just 1–2px apart.

**Modular scales** (1.25x, 1.414x, 1.5x, 1.618x / golden ratio) create proportional, harmonious size relationships.

### Weight

Weight creates emphasis within a size level. **Bold for emphasis; regular for body.** Don't use weight as decoration — reserve it for genuinely important elements. Semi-bold/medium can create hierarchy between body text levels. Avoid using multiple weights of the same typeface at the same size — differentiate with size instead.

### Rhythm and baseline grid

Consistent vertical rhythm (aligning text to a baseline grid) creates visual order that readers feel even when they don't consciously see it. Line height should typically be 1.4–1.6× for body text. Tighter for large headings, looser for small text or long-form reading.

### Leading and tracking

**Leading (line height):** Too tight = hard to read; too loose = lines feel disconnected. Long line lengths need more leading.

**Tracking (letter spacing):** Tight for large display text; normal for body; open for uppercase labels and very small text. Never tighten tracking on body text.

### Contrast against background

Type must be legible against its background at all sizes. Small text requires higher contrast than large text. Don't rely on color alone — weight and size also affect legibility.

### Font pairing

Maximum 2 typefaces, with clear role distinction:
- **Display/heading:** expressive, carries brand personality
- **Text/body:** neutral, optimized for reading

If a single typeface has sufficient range (multiple weights, optical sizes), use only one. Pairing for variety is a common mistake — pair for function.

### Audit questions
- Does the scale have clearly perceivable steps at each level?
- Is weight used for genuine emphasis or decorative habit?
- Does body text have sufficient line height for the line length?
- Are all text elements legible against their backgrounds?
- Do the typefaces have clear, differentiated roles?

## Vision and light

### Why it matters
Colour theory assumes a lit room and a rested eye. At night neither holds. The eye switches from cones (photopic) to rods (scotopic), and light also acts on the body clock through a third receptor that has nothing to do with seeing. A screen designed for day can wake someone up, ruin their night vision, or keep them from sleeping.

### Night vision (scotopic and mesopic vision)
- Rods do the seeing in the dark. They peak near 507 nm and are nearly blind to long-wavelength red (the Purkinje shift).
- Full dark adaptation takes 20–30 minutes. One look at white or blue light resets most of it.
- Dim red light keeps it. That is why cockpits, submarines, darkrooms and astronomers use red, and why some watches ship a red-shift night mode.
- In the dark, colour discrimination and fine detail drop. Use large, simple shapes and few colours.

### Light and the body clock (non-visual effects)
- Melanopsin cells (ipRGCs) peak near 480 nm. They tell the body clock it is day (Brainard 2001; Lucas et al. 2014). The CIE measures this as melanopic EDI (CIE S 026:2018).
- Blue-rich light at night holds back melatonin and delays sleep. Dim, long-wavelength (red or amber) light does so least. Intensity matters as much as colour: the dimmest readable level is the target.
- In the other direction, bright, cool light in the morning helps waking and anchors the clock. A wake-up screen or alarm may be bright on purpose.

### Colour vision
- About 8% of men and 0.5% of women of Northern European descent have a colour-vision deficiency. Most of them are red-green: deutan (most common) or protan.
- Protans see long-wavelength red as darker. A red-on-black night screen therefore loses contrast for them, so make the red bright enough and test it.
- Simulate deficiencies (Brettel, Viénot & Mollon 1997; Machado et al. 2009), and carry meaning in luminance, shape or label, never in hue alone.

### Acuity, contrast sensitivity and age
- Legibility depends on visual angle, which is size relative to viewing distance. A watch at 30 cm, a phone at 35 cm and a sign at 10 m need very different sizes. As a rule of thumb, body text needs about 0.2° or more of x-height, and more for glanceable or moving use (Legge & Bigelow 2011).
- From about 45, near focus fails (presbyopia). Older eyes also let in much less light and scatter more glare (Owsley 2011). Thin weights and light-grey text fail them first.

### Daylight and glare
- In sunlight, screen reflections lower the effective contrast far below what was designed. Disability glare (veiling light) erases detail, and discomfort glare makes people look away.
- Outdoors, on signage and on wearables, aim well above the minimum contrast. Prefer solid, heavy shapes and allow a high-brightness mode. Perceptual contrast measures such as APCA model this better than a static ratio.

### Brightness in context
- Perceived brightness is relative to adaptation. A screen that reads well in daylight glares in a dark bedroom.
- Dark mode is not night mode. White text on black still emits short-wavelength light. A night surface is dim and warm, not just inverted.

### Audit questions
- Will this be looked at in the dark, at night, or by someone trying to sleep?
- Is the night surface dim and long-wavelength (red or amber on black), with no white or blue blocks?
- Does anything flash full-brightness white at night: a splash screen, a dialog, a system picker?
- Is the wake-up moment the one place that is bright on purpose?
- Does it still read under deutan and protan simulation, and in grayscale?
- Is text sized by visual angle for the real viewing distance, and readable by a 60-year-old?
- Does it hold up in direct sunlight?

---

## Brand adherence

### Why it matters
A brand is a promise kept in every rendered detail. Design principles are near-permanent; brand tokens change, so read the brand from the project's own design tokens (CSS custom properties or their equivalent, the single source of truth) and its decisions from the project's brand brief, never from values restated elsewhere.

### Tokens are the brand, rendered
Every colour, typeface, size, space, radius, duration and easing on screen should resolve to a declared token. Literals that bypass tokens are the measurable drift: an off-palette colour, an undeclared font, a 14px size next to a 1rem scale, a 13px radius. Hairlines (1–2px) are on-brand only when a token names them. Pill radii (≥999px or %) are a shape, not a scale step.

### Identity is judged against the brief
Voice and tone, imagery and logo use are judged, not measured. The brief states the project's constraints; a finding that contradicts a stated brand decision is wrong, and a finding that relied on the brief cites it.

### Audit questions
- Which token family (colour, type, space, radius, motion) drifts most from its declared tokens, and which literals cause it?
- Does every theme state re-resolve colours to that theme's tokens?
- Does the copy's voice match the brief's personality sliders? Does imagery follow the brief's rules?
- Does any recommendation contradict a decision the brief states?
