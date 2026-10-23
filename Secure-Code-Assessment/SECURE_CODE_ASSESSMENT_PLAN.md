# Assessment Plan

## Objective
Review a Python Flask Student Notes Portal for common security weaknesses, apply fixes, and validate the fixes through static analysis and automated tests.

## Scope and method
1. Manually review authentication, database queries, note routes, session configuration, and form handling.
2. Compare an intentionally vulnerable version with a remediated version.
3. Run Bandit (SAST) and pip-audit (dependency vulnerability checks).
4. Run pytest regression tests against the secure implementation.

## Target issues
1. SQL injection from unsafe SQL string interpolation.
2. Insecure direct object reference / broken access control (IDOR).
3. Plain-text password storage.
4. Hardcoded session secret.
5. Missing CSRF validation on state-changing forms.

## Acceptance criteria
- User passwords are hashed with Werkzeug helpers.
- SQL uses parameterized queries.
- A user can read, edit, and delete only their own notes.
- The secure app reads its secret key from `SECRET_KEY` and refuses to start without it.
- Flask-WTF CSRF protection is enabled for forms.
- Automated tests verify password hashing and cross-user note access denial.
- Scanner output is generated locally and preserved under `evidence/`.
