# Data Visualization

## Tufte — Core Principles

Edward Tufte's framework for information display. The underlying thesis: data is the point; everything else is overhead.

**Data-ink ratio**
Maximize the proportion of ink (or pixels) devoted to actual data. Minimize everything else. For every non-data element, ask: does removing this lose information? If not, remove it.

High data-ink ratio ≠ dense. It means every mark earns its place.

**Chartjunk**
Decorative elements that add visual noise without information value:
- Moiré vibration (busy background patterns)
- Grid lines heavier than the data
- Unnecessary 3D effects
- Decorative icons overlaid on data
- Redundant encoding (color + label + shape for the same variable)

Chartjunk performs sophistication at the cost of clarity.

**Small multiples**
The same graphic structure repeated for different data subsets, arranged in a grid. Enables comparison across dimensions that animation or layering can't achieve — because comparison requires simultaneous visibility, not sequential viewing.

*Example:* a small multiples layout for energy levels across Monday vs. Tuesday vs. Wednesday reveals weekly pattern that a single merged timeline obscures.

**Lie factor**
The ratio of visual effect size to actual data effect size.
```
Lie factor = (size of effect in graphic) / (size of effect in data)
```
A lie factor of 1.0 is honest. A truncated y-axis that makes a 2% increase look like a 400% increase has a lie factor of 200. Know when you're introducing it deliberately (emphasis) vs. accidentally (default chart settings).

**Data density**
High data density in small space is a virtue, not a problem. Context requires comparison; comparison requires density. The instinct to "make it simpler" by removing data often removes the ability to understand what the data means.

**The sparkline**
A word-sized graphic — a tiny visualization embedded inline with text or labels. Tufte's invention. Shows trend at a glance without the overhead of a labeled chart. Use for time-series data where direction matters more than precise values.

---

## Cairo — Functional vs. Decorative Axis

Alberto Cairo's framing: every visualization sits on a spectrum between fully functional and fully decorative. Neither extreme is inherently wrong — but you must know which you're making and why.

**Functional:** optimized for fast, accurate data extraction. Minimal visual complexity. Standardized forms (bar charts, scatterplots) that readers already know how to read. Used in dashboards, scientific communication, decision support.

**Decorative/expressive:** optimized for engagement, shareability, visual impact. More willing to trade some accuracy for aesthetic resonance. Used in journalism, storytelling, advocacy.

**The mistake:** building a decorative visualization and presenting it as functional (misleading precision), or building a functional visualization for an audience that needs the story (communication failure).

**Visual rhetoric:** all charts make arguments. The designer's choices about what to show, what to omit, what scale to use, what comparison to draw — these are rhetorical acts. There is no neutral chart. Own the argument your visualization makes.

**Truthful / Functional / Beautiful / Insightful / Enlightening** — Cairo's five qualities of good visualization. Not all are required simultaneously, but honesty (truthful) is non-negotiable.

---

## Stephen Few — Dashboard Design

Dashboards are for monitoring at a glance, not analysis. The design constraints are strict.

**Core rules:**
- All critical information above the fold — scrolling defeats monitoring
- Group related metrics; separate unrelated ones
- Use position and size as primary hierarchy; color as secondary
- Minimize labels, maximize data
- No pie charts for monitoring (angle is hard to compare; use bar or bullet charts)
- Sparklines for trend data — trend is usually more important than exact value at a point

**Visual encoding hierarchy (Few, after Cleveland & McGill):**
Position on common scale > Position on nonaligned scale > Length > Angle/slope > Area > Volume > Color hue > Color saturation

Use higher-ranked encodings for the most important data. Don't encode critical values in color alone — both because color has low precision and because colorblindness is common.

**The bullet graph:** Few's replacement for gauges and thermometer charts. Shows a single metric against its target and performance bands. More information-dense than a gauge, readable at smaller sizes.

For any glanceable display: design for 200ms to extract the relevant signal, not 2 seconds. Each data element should answer a single question: "is this in range?" or "what's the trend?" If reading it requires more than a glance, it's analysis UI wearing a monitoring costume.
