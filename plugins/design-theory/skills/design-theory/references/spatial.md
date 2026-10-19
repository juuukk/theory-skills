# Spatial, Wayfinding & Multisensory Design

## Kevin Lynch — The Image of the City

People construct mental maps of physical environments from five structural elements. These maps are not accurate representations — they're selective, emotionally weighted, and highly personal. But they share structural features across people.

**The five elements:**

**Paths** — Routes along which movement occurs. Streets, corridors, transit lines, the worn track between zones. Paths are the primary structuring element; most people organize their mental maps around them.

**Edges** — Boundaries and breaks in continuity. Fences, water bodies, walls, the abrupt end of one zone and start of another. Edges define territories and orient even when no path runs along them.

**Districts** — Areas with recognizable character, enterable from inside. Character = consistent atmosphere, material, use, activity. People feel themselves to be inside a district.

**Nodes** — Strategic spots, junctions, concentrated foci. Entrance points, the main intersection, places where paths converge and decisions get made.

**Landmarks** — External reference points used for orientation. Distinguished from nodes by visual singularity — seen from outside rather than entered. A tower, a distinctive structure, a unique form visible from a distance.

**Design implication:** navigation aids should use these five elements, not coordinate logic. "Walk toward the tower until you see the main entrance" is more useful than "proceed 200m northwest." Wayfinding cues should map to landmarks, edges, and districts — not grid coordinates or compass bearings.

---

## Charles Spence — Crossmodal Perception

The senses do not operate as independent channels. Inputs from one modality routinely alter perception in another.

**Established crossmodal effects:**
- Sound changes the perceived texture and flavor of food (higher-pitched sound = sweeter; lower = more bitter)
- Visual background color changes the perceived flavor of a drink
- Vibration changes the perceived pitch of a tone
- Haptic texture changes the perceived visual appearance of a surface
- Ambient noise level affects perceived crunchiness of food (the "Sonic Chip" experiment)

**Why it matters for design:**
Sound design, vibration patterns, and visual environment are not independent design problems. A haptic notification that pulses in rhythm with ambient sound will be perceived differently than one that pulses against it. A dark interface with low-saturation colors creates a different sensory context for sound than a bright interface.

**Design principle:** know what sensory environment your design will be experienced in. Design with that context as a constraint, not an afterthought. Any notification exists *within* the ambient sensory environment — the timing, duration, and rhythm of haptic or audio output interacts with what is already present. A vibration that pulses against an existing rhythmic environment is perceived differently than one that is silent to it.

---

## R. Murray Schafer — Soundscape Theory

Acoustic environments are not neutral backgrounds. They are designed (or undesigned) systems with structural components.

**Three components of a soundscape:**

**Keynote sounds** — Background sounds that define the acoustic environment. Heard everywhere, often unnoticed individually, but unmistakable in their absence. These are the tonal center of the soundscape.

**Sound signals** — Foreground sounds, attended to consciously. Announcements, alarms, someone calling your name. Designed to be perceived.

**Soundmarks** — Sounds unique to a place that anchor acoustic identity. The specific reverb of a venue, a characteristic mechanical or environmental sound. People recognize a soundmark even in recordings — it says "this place."

**For app design in a sonic environment:**
Audio notifications compete with keynote sounds for attention and fight with sound signals for the foreground. In high-noise contexts, audio fails.
- Haptic over audio — in loud or sensory-rich environments
- Peripheral over intrusive — the user should not have to acknowledge
- Design notifications to *not* become soundmarks — a distinct app sound that triggers repeatedly becomes an intrusive presence, not an ambient one

**The listening modes (Schaeffer, complementary):**
- Causal listening: identifying the source of a sound
- Semantic listening: interpreting a sound's code or language
- Reduced listening: attending to sound as object (timbre, texture, pitch) without source or meaning

Different app sounds invoke different listening modes. A voice notification requires semantic listening (attention cost). A subtle haptic pattern can be processed causally or reduced (lower cost).

---

## Body and Environment

### Touch and haptics
- Skin is most sensitive to vibration around 200–300 Hz (Pacinian corpuscles). Movement, clothing and a loose strap mask it.
- Tactons (Brewster & Brown 2004) carry meaning through rhythm and duration, not intensity alone. People can tell only a few patterns apart, so keep the set small.

### Hearing
- Background noise masks sound, and a signal needs a clear margin above it to be heard. Hearing for high frequencies falls with age (presbycusis), so do not carry key alerts only in high tones (Moore, *An Introduction to the Psychology of Hearing*).

### Physical environment
- Cold lowers dexterity and touch-screen accuracy, and gloves block capacitive touch. Vibration from a vehicle or bike ruins small targets. Heat and sweat cause false touches.
- Design for the environment of use: physical buttons over touch where cold, wet or moving, and larger targets where vibrating.

### Body size and reach
- Size physical products, venues and wearables from the 5th-percentile woman to the 95th-percentile man (Pheasant & Haslegrave, *Bodyspace*).
- About half of phone use is one-handed (Hoober 2013). Put frequent actions within thumb reach.

### Audit questions
- Which senses are free at the moment of use, and how strong is each signal relative to the noise?
- Does the design work cold, wet, gloved, moving and one-handed, where that is the real context?
- Does the physical sizing cover the 5th to 95th percentile?
