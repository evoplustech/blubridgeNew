# Whole-site security work — in progress

## Preservation boundary
All existing records are treated as legitimate/protected. No destructive testing against existing records. Public enquiry forms must remain create-only; authenticated administrator access to global staff records is intentional. This application currently has a single administrator role, not a normal-user/tenant ownership model.

## Backup gate
Passed. See `BACKUP_AND_ROLLBACK.md`. No application hardening edits or existing-record mutations have been made at this stage.

## Confirmed initial findings
| ID | Severity | Root cause | Status |
|---|---|---|---|
| SEC-001 | Critical | Known default administrator credential remains active; source also falls back to a built-in credential. Successful login authorizes all private admin reads, exports and destructive operations. | Read-only database inspection confirms active default hash. Rotation requires a secure operator handover. |
| SEC-002 | High | Public unified contact DTO accepts arbitrary extra properties and client-controlled record identifiers/timestamps, then broadly copies them into database writes. | Confirmed in source; fix pending. |
| SEC-003 | High | Client-supplied forwarding headers determine rate-limit/lockout identity without an explicit trusted-proxy boundary. | Confirmed in source; fix pending. |
| SEC-004 | High | Administrator password uses unsalted SHA-256; tokens live in browser localStorage and server process memory. No cookie-bound CSRF/session revocation model. | Confirmed in source; coordinated auth/frontend change pending. |
| SEC-005 | Medium | Missing CSP and incomplete early-error security-header coverage; Express static catch-all lacks a clearly enforced confinement boundary. | Source review; traversal exploit not yet confirmed. |
| SEC-006 | Medium | Admin detail GET mutates record status; résumé delete trusts a stored filesystem path more broadly than the download path. | Additional main-agent source findings; fix pending. |

## Still required before completion
- Complete endpoint/method/access inventory and strict request schemas across every handler.
- Strong credential handover, cookie/session/CSRF and server-authoritative authorization changes.
- Form/abuse protection, upload/path checks, method/CORS/header hardening, dependency advisory scan and compatible updates.
- Isolated role/request-manipulation tests, all-method matrix and public-form/admin regression tests.
- Final report containing modified files, verified controls and explicit remaining infrastructure limitations.

No claim of production readiness or completed hardening is made by this progress document. The identified default-credential issue remains unresolved until rotation and verification complete.