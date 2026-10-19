# Architecture

Whether the shape of the system holds: what depends on what, what changes together, and what was decided and why. Some architecture questions also sit in other areas: dependency cycles and information hiding in `simplicity.md`, timeouts on outside calls and visible failures in `reliability.md`.

## Stable dependencies

Martin, Stable Dependencies Principle (*Agile Software Development*, 2002): depend in the direction of stability. Instability I = Ce / (Ca + Ce), where Ce counts what a module depends on and Ca what depends on it. A module many others rely on should not lean on one that changes all the time, or its breakage spreads to everything above it. Warning signs: a shared core or utility module imports from a feature or page module; a "common" folder that changes in most commits.
In plain words: a part many others rely on leans on a part that changes all the time.

## Change coupling

Tornhill, *Your Code as a Crime Scene* (2015): history shows coupling the code hides. Two files that change in the same commits again and again are coupled, whether or not one imports the other. Warning signs: a fix in one folder always needs a matching edit in another, with no import between them; two files that have to be kept "in sync" by hand. Fix: make the dependency explicit (one module, or a named interface), or write down why the two must move together.
In plain words: two parts that look separate always change together, so a fix in one quietly needs the other.

## Boundaries

Parnas (CACM 1972): decompose by the decisions likely to change, one secret per module. Conway (1968): a system's structure copies the communication structure of the people who build it. Evans, bounded contexts (*Domain-Driven Design*, 2003): one model per boundary, translated at its edge. Warning signs: one reason to change needs edits in three or more places; a module reaches into another's internals instead of a named interface; a split that exists only because two people or two repos happened to divide the work there.
In plain words: one idea is spread across many places, so every change to it touches all of them.

## Trade-offs

Brewer, CAP (2000; Gilbert and Lynch 2002): when copies of state are cut off from each other, a system chooses consistency or availability. Abadi, PACELC (2012): and when nothing is cut off, it still chooses latency or consistency. In small tools this shows up as a cache and its source, an offline store and its sync, or two files that hold the same fact. Warning signs: no stated winner when the copies conflict; no decision about what the user sees while they disagree (stale, blocked, or merged).
In plain words: when the two copies disagree, nobody decided which one is true, so users can see or save the wrong one.

## Decision records

Nygard, "Documenting Architecture Decisions" (2011): a short record per structural decision with its context, the decision and its consequences, kept next to the code. Warning signs: a new dependency, service, storage or public interface arrives with no written why (no decision record, spec line or commit body).
In plain words: the next person can't tell why it was built this way, so they will undo it or work around it.

## Theory to think with

- **Fitness functions** (Ford, Parsons and Kua, *Building Evolutionary Architectures*, 2017): keep an architectural property with an automated test, so it holds as the code changes.
- **Gall's law** (Gall, *Systemantics*, 1975): a complex system that works evolved from a simple system that worked. Grow a working shape rather than designing the final one up front.
- **Leverage points** (Meadows, 1999): the places to intervene in a system, from parameters (weakest) through feedback loops and information flows to goals and paradigms (strongest). When a change only tunes numbers, ask whether a missing feedback loop is the real problem.
