# Maintainability

## Complexity

McCabe, "A Complexity Measure" (IEEE TSE 1976): count the independent paths through a function. Above roughly 10 to 15, defects and change risk climb.

## Size

Martin, *Clean Code* (2008), "do one thing"; Lehman's laws (1980): software that is changed grows complex unless work is done to reduce it. A long function usually hides several jobs that want their own names.

## Duplication

Hunt & Thomas, *The Pragmatic Programmer* (1999), DRY: one authoritative place per piece of knowledge, so a fix lands everywhere. Trivial repeats don't count; a repeated block of real logic does.

## Comments

Comment rot (Fowler, *Refactoring*: comments as a deodorant). A comment that contradicts the code beside it is worse than none. A non-obvious decision with no "why" leaves the next person guessing.
