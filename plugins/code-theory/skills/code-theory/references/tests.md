# Tests

## Specification

Beck, *Test-Driven Development* (2002): the suite is the executable statement of what the code must do. A red suite means a stated behaviour is gone. A test command that exits 0 but runs nothing is not a pass; the count of tests run must show.

## Static checking

Cardelli, "Type Systems" (1996): a sound checker rules out a class of run-time errors before shipping. At minimum every changed file compiles; typed languages run their type checker.

## Exercise

Myers, *The Art of Software Testing* (1979): code no test runs is unverified. Focused or skipped tests (`.only`, `.skip`, `xit`, `pytest.skip`) silently shrink the suite.

## Mutation

DeMillo, Lipton & Sayward, "Hints on Test Data Selection" (1978); the competent-programmer and coupling hypotheses: tests that catch small injected faults also catch real ones. Coverage says a line ran; mutation testing says a test would notice it was wrong. A surviving mutant names the exact line no test checks.

## Oracles

The test-oracle problem (Weyuker 1982; Barr et al., IEEE TSE 2015): a test is only as good as what it asserts. Good tests check outputs or effects a caller could observe. Weak tests assert private internals, mock the unit under test, or assert nothing at all.

## Boundaries

Boundary-value analysis (Myers; Beizer, *Software Testing Techniques*): faults cluster at edges: empty, zero, one, limit, limit+1, missing field. Each changed branch or limit deserves a test at its edge, or a stated invariant checked by an assert.

## Regression

Regression testing: a fixed bug gets a test that fails on the old code, so it cannot quietly return. When a change is a fix, name the test that would have failed before it.
