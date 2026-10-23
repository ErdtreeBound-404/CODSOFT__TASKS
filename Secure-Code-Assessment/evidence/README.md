# Scan evidence

This folder intentionally does not contain fabricated scanner output. After installing the tools, run from the project root:

```powershell
bandit -r vulnerable -f txt -o evidence/bandit_before.txt
bandit -r secure -f txt -o evidence/bandit_after.txt
pip-audit -r vulnerable/requirements.txt > evidence/pip_audit_before.txt
pip-audit -r secure/requirements.txt > evidence/pip_audit_after.txt
python -m pytest secure/tests -v
```

`pip-audit` results depend on the package versions and vulnerability database available when the scan runs. Save the terminal test output with your submission if your instructor requires it.
