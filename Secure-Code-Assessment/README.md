# Secure Code Assessment — Student Notes Portal

A comprehensive security assessment and vulnerability remediation project for a Flask-based Student Notes Portal. It features an intentionally vulnerable baseline app, a fully remediated production-grade secure application, an automated security testing suite, static application security testing (SAST) with Bandit, and dependency vulnerability auditing with pip-audit.

---

## 🚀 Overview

This project demonstrates practical secure software development lifecycle (SSDLC) principles by identifying common web vulnerabilities in a legacy codebase, analyzing their root causes and threat models, and implementing robust defenses.

### Vulnerabilities Assessed & Mitigated
- **SQL Injection (SQLi)**: Converted vulnerable string interpolation queries to parameterized prepared statements.
- **Insecure Direct Object Reference (IDOR)**: Enforced strict user-ownership validation on note retrieval and modification.
- **Cross-Site Request Forgery (CSRF)**: Integrated Flask-WTF CSRF tokens across all form actions and state-changing requests.
- **Plaintext Password Storage**: Replaced plaintext passwords with salted `scrypt` / `pbkdf2` password hashing via Werkzeug.
- **Hardcoded Secret Keys**: Migrated hardcoded application secrets to configurable environment variables.
- **Security Misconfigurations**: Disabled production debug mode and bound endpoints safely.

---

## 📂 Project Layout

```
Secure-Code-Assessment/
├── secure/                             # Remediated secure application
│   ├── app.py                          # Hardened Flask application factory
│   ├── database.py                     # SQLite database abstraction with parameterized queries
│   ├── requirements.txt                # Production dependencies
│   ├── templates/                      # HTML templates with CSRF tokens
│   │   ├── base.html
│   │   ├── login.html
│   │   ├── note.html
│   │   ├── notes.html
│   │   └── register.html
│   └── tests/                          # Security regression test suite
│       └── test_security.py
├── vulnerable/                         # Intentionally vulnerable baseline (Demonstration only)
│   ├── app.py
│   ├── database.py
│   └── requirements.txt
├── evidence/                           # SAST / audit scan outputs
│   ├── bandit_after.txt                # Bandit security scan report
│   └── README.md                       # Verification methodology
├── REPORT.md                           # Detailed assessment report, vulnerability matrix & fixes
├── SECURE_CODE_ASSESSMENT_PLAN.md      # Testing plan and threat modeling document
├── bandit_after.txt                    # Root-level audit record
├── process1.txt                        # Execution audit log
├── process2.txt                        # Execution audit log
└── README.md                           # This guide
```

---

## ⚙️ Requirements

- **Python 3.10+**
- PowerShell, Windows Command Prompt, or Bash

---

## 🚀 Running the Secure Application

```bash
# Navigate to the project directory
cd Secure-Code-Assessment

# Create and activate a virtual environment
python -m venv .venv

# On Windows (PowerShell):
.venv\Scripts\Activate.ps1
# On Windows (Command Prompt):
# .venv\Scripts\activate.bat
# On Linux/macOS:
# source .venv/bin/activate

# Install dependencies
python -m pip install -r secure/requirements.txt

# Set the application secret key
# PowerShell:
$env:SECRET_KEY = "replace-this-with-a-long-random-value"
# CMD:
# set SECRET_KEY=replace-this-with-a-long-random-value
# Bash:
# export SECRET_KEY="replace-this-with-a-long-random-value"

# Launch the secure application
python secure/app.py
```

Access the portal in your browser at `http://127.0.0.1:5000`.

---

## 🧪 Running Security Tests and Scanners

Ensure the test packages are installed:

```bash
python -m pip install pytest bandit pip-audit
```

### 1. Automated Security Tests
Run the pytest regression test suite covering CSRF protection, password hashing, IDOR prevention, and SQL injection resistance:

```bash
# PowerShell
$env:PYTHONPATH = "secure"
python -m pytest secure/tests -v
```

### 2. Static Application Security Testing (Bandit)
Scan the secure codebase to verify zero high-severity vulnerabilities:

```bash
bandit -r secure -f txt -o evidence/bandit_after.txt
```

To inspect the vulnerable baseline for educational comparison:
```bash
bandit -r vulnerable -f txt -o evidence/bandit_before.txt
```

> [!WARNING]
> The `vulnerable/` directory is intentionally insecure and designed solely for isolated classroom review. **Never deploy or expose it to a public network.**

### 3. Dependency Vulnerability Audit (pip-audit)
Scan project requirements for known CVEs:

```bash
pip-audit -r secure/requirements.txt
```
