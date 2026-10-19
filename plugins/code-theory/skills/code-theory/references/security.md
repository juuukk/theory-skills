# Security

## Dedicated review

Security review deserves its own pass with its own tools: a dedicated security scanner or reviewer, run after the last change. A finding from before the last change no longer describes the code.

## Supply chain

OWASP Top 10 2025 A03 (software supply chain failures): production dependencies carry no known high or critical advisories (for example `npm audit --omit=dev`, `pip-audit`).

## Secrets

CWE-798 hard-coded credentials: no keys, tokens or passwords in source. When reporting one, name the file, line and kind of secret, never the value. Keys that are public by design (a browser-side API key restricted by domain) are the exception, and should be marked as such.
