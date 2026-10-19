# Reliability

## Fail fast

Shore, "Fail Fast" (IEEE Software 2004): surface errors at the point of failure. Empty catch blocks, bare `except:`, and uncommented `except ...: pass` hide failures. Unawaited promises lose errors. A fallback that shows defaults or stale data as if they were real is a silent failure; it is acceptable only when the degradation is visible to the reader or documented as intended.

## Integration points

Nygard, *Release It!* (2nd ed. 2018): every call to another system is a place to hang. Every outbound network call needs a timeout or abort signal, and the timeout must fit the job: a 30-second timeout on each of five calls does not fit inside a one-minute schedule.

## Idempotence

A retried or re-run job must produce the same state: dedupe keys, upserts, one row per period. Ask: what happens if this job runs twice in a minute?

## Observability

Majors, Fong-Jones & Miranda, *Observability Engineering* (2022): a failure nobody sees is an outage of unknown length. Unexpected errors raise (a non-zero exit) or report somewhere a person or monitor will see them.
