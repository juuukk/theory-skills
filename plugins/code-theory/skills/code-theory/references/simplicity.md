# Simplicity

## Coupling

Martin, Acyclic Dependencies Principle (*Agile Software Development*, 2002): no cycles among modules, so each can change and be tested alone. Type-only imports are erased at compile time and do not count.

## Information hiding

Parnas, "On the Criteria to Be Used in Decomposing Systems into Modules" (CACM 1972); Ousterhout, *A Philosophy of Software Design* (2018): deep modules have a small interface over substantial behaviour. Warning signs: callers reach into internals, layers only pass calls through, one change needs edits in many files.

## YAGNI

Beck and Jeffries (XP), KISS: build only what is needed now; delete before adding. Warning signs: a definition nothing references, an interface with one implementation, configuration for a constant, unused options, scaffolding "for later".
