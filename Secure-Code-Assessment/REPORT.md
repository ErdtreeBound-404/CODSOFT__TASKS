# Secure Code Assessment Report

**Application:** Student Notes Portal  
**Language/framework:** Python, Flask, SQLite, Jinja2  
**Assessment type:** Manual source review, SAST, dependency review, automated regression tests  
**Status:** Project implementation supplied; run the listed commands to generate machine-specific scan evidence.

## 1. Executive summary
The project compares a deliberately vulnerable Flask implementation with a secure implementation. The baseline demonstrates five common weaknesses. The secure version addresses these using parameterized SQL, per-user authorization checks, Werkzeug password hashing, an environment-provided session secret, and CSRF tokens.

## 2. Findings and remediation

| ID | Finding | Baseline risk | Remediation in secure version | Validation |
|---|---|---|---|---|
| V-01 | SQL injection | Search input is interpolated into SQL text, potentially changing query logic. | Uses SQLite `?` placeholders and bound parameters. | Review query implementation; test search with quote characters. Run Bandit as supporting evidence. |
| V-02 | Broken access control / IDOR | Note lookup does not verify that the signed-in user owns the requested note. | Read/update/delete queries include both note ID and session user ID. | `test_user_cannot_read_another_users_note` expects 404. |
| V-03 | Weak password storage | Baseline stores passwords as plain text. | Uses `generate_password_hash` and `check_password_hash`. | `test_password_is_hashed` checks stored value differs from original. |
| V-04 | Hardcoded secret key | Baseline includes a literal secret key in source. | Secure app requires `SECRET_KEY` environment variable and fails clearly if absent. | Inspect config and launch without the variable. |
| V-05 | Missing CSRF protection | Baseline state-changing forms do not validate CSRF tokens. | `CSRFProtect` enabled; templates include `csrf_token()`. | `test_csrf_rejects_post_without_token` expects 400. |

## 3. Tools and how to collect evidence

- **Bandit (SAST):** `bandit -r vulnerable -f txt -o evidence/bandit_before.txt` and `bandit -r secure -f txt -o evidence/bandit_after.txt`.
- **pip-audit (SCA):** `pip-audit -r vulnerable/requirements.txt` and `pip-audit -r secure/requirements.txt`. Save output by appending `> evidence/pip_audit_before.txt` or `> evidence/pip_audit_after.txt` in a shell. Dependency findings depend on the package versions and database at scan time.
- **pytest:** `python -m pytest secure/tests -v`.

No scan findings are claimed as measured in this report until the commands have actually been run. Bandit is a useful signal, not proof of security; it may not detect business-logic flaws such as IDOR. Manual review and tests are required.

## 4. Secure coding recommendations
1. Use parameterized database queries; never concatenate untrusted input into SQL.
2. Enforce authorization on every object read and mutation, not just at login.
3. Store password hashes, never raw passwords; use a modern password-hashing helper.
4. Keep secrets out of source control and rotate any secret that has been exposed.
5. Enable CSRF protection for browser forms that change server state.
6. Keep dependencies updated and review audit results before release.
7. Use HTTPS in production, secure cookie flags, rate limiting, logging, and a production WSGI server.
8. Validate inputs and return generic authentication errors to reduce information leakage.

## 5. Limitations
This is an educational sample, not a production-ready portal. It does not include email verification, password reset, rate limiting, comprehensive audit logging, deployment hardening, or a full threat model. The vulnerable folder intentionally contains exploitable examples and must only be used locally for coursework. Scanner output must be generated on the assessment machine for accurate evidence.

## 6. Conclusion
The secure implementation demonstrates the requested workflow: select an application, inspect common weaknesses, apply secure coding practices, and validate key controls using tests and security tools. The final submission should include the actual scan output files produced on the student's machine.
