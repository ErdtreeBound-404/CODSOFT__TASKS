# CODSOFT Cybersecurity & Development Tasks

Welcome to the central repository for the **CodSoft Cybersecurity Internship** tasks and projects. This repository consolidates three distinct, end-to-end cybersecurity and software engineering projects into a single, unified workspace.

---

## 📁 Repository Structure

```
CODSOFT__TASKS/
├── .gitignore                               # Global ignore rules (dependencies, caches, env, media)
├── README.md                                # Root documentation and quick-start guide
│
├── Network-Packet-Analyzer/                 # Project 1: Real-time traffic monitoring & packet sniffer
│   ├── src/                                 # React + TypeScript frontend dashboard
│   ├── packet_analyzer.py                   # Python packet inspection and analytics script
│   ├── scapy_sniffer.py                     # Live Scapy packet sniffer
│   ├── server.ts                            # WebSocket streaming server
│   ├── captured_packets.csv                 # Packet capture dataset
│   ├── replay_packets.csv                   # Offline packet replay dataset
│   ├── package.json                         # Node.js dependencies
│   ├── tsconfig.json                        # TypeScript configuration
│   ├── vite.config.ts                       # Vite configuration
│   └── README.md                            # Project-specific documentation
│
├── Secure-Code-Assessment/                  # Project 2: Flask vulnerability assessment & remediation
│   ├── secure/                              # Hardened Flask application with tests
│   │   ├── app.py                           # Secure application factory
│   │   ├── database.py                      # Parameterized database queries
│   │   ├── templates/                       # HTML templates with CSRF tokens
│   │   ├── tests/                           # Pytest regression suite
│   │   └── requirements.txt                 # Application dependencies
│   ├── vulnerable/                          # Intentionally vulnerable baseline (reference)
│   ├── evidence/                            # Bandit SAST scan evidence
│   ├── REPORT.md                            # Comprehensive vulnerability report & remediation matrix
│   ├── SECURE_CODE_ASSESSMENT_PLAN.md       # Assessment plan and methodology
│   └── README.md                            # Project-specific documentation
│
└── Phishing-Awareness-Training-Program/     # Project 3: Interactive phishing training & simulation
    ├── src/                                 # Interactive React + TypeScript components
    │   ├── components/                      # Training modules, simulator, quiz, certificate
    │   ├── data/                            # Attack scenarios, case studies, quizzes
    │   └── types/                           # TypeScript definitions
    ├── package.json                         # Node.js dependencies
    ├── tsconfig.json                        # TypeScript configuration
    ├── vite.config.ts                       # Vite configuration
    └── README.md                            # Project-specific documentation
```

---

## 🎯 Projects Overview

### 1. [Network Packet Analyzer](./Network-Packet-Analyzer)
A real-time network packet inspection and protocol analysis suite.
- **Technologies**: React 18, TypeScript, Tailwind CSS, Vite, Python 3 (`scapy`, `pandas`), Node.js / Bun (`server.ts`, WebSocket `ws`).
- **Features**:
  - Live packet sniffing on network interfaces via Scapy.
  - Offline traffic replay with pre-captured CSV datasets.
  - Multi-layer protocol breakdown (Ethernet, IP, TCP, UDP, ICMP, DNS, HTTP).
  - Anomaly detection, throughput metrics, and packet filtering dashboard.
- **Quick Start**:
  ```bash
  cd Network-Packet-Analyzer
  npm install
  npm run dev
  # In another terminal for packet inspection:
  python packet_analyzer.py
  ```

---

### 2. [Secure Code Assessment](./Secure-Code-Assessment)
A complete security audit, vulnerability assessment, and remediation project on a Flask web portal.
- **Technologies**: Python 3, Flask, SQLite, Werkzeug, Flask-WTF, Pytest, Bandit (SAST), pip-audit.
- **Features**:
  - Remediates SQL Injection, Insecure Direct Object References (IDOR), CSRF, plaintext password storage, and sensitive data exposure.
  - Automated security regression tests (`pytest`).
  - Static Application Security Testing (SAST) with Bandit with clean audit evidence.
  - Side-by-side comparison of vulnerable vs. secure implementation patterns.
- **Quick Start**:
  ```bash
  cd Secure-Code-Assessment
  python -m venv .venv
  # Windows: .venv\Scripts\Activate.ps1 | Linux: source .venv/bin/activate
  python -m pip install -r secure/requirements.txt
  python secure/app.py
  # Run tests:
  python -m pip install pytest bandit
  python -m pytest secure/tests -v
  ```

---

### 3. [Phishing Awareness Training Program](./Phishing-Awareness-Training-Program)
An interactive educational platform designed to train users in identifying and mitigating social engineering and phishing attacks.
- **Technologies**: React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite.
- **Features**:
  - Interactive training modules on Email Phishing, Spear Phishing, Smishing, and Vishing.
  - "Spot-the-Phish" interactive inbox simulator.
  - Real vs. Fake comparison tool for analyzing email headers, domains, and phishing URLs.
  - Real-world breach case studies and interactive presentation decks.
  - Final assessment quiz with dynamic scoring and certificate generation.
- **Quick Start**:
  ```bash
  cd Phishing-Awareness-Training-Program
  npm install
  npm run dev
  ```

---

## 🔒 Security & Best Practices

- **Zero Secrets Committed**: All environment variables, API tokens, and credentials are kept out of version control via `.gitignore`. Placeholders are documented in `.env.example` templates.
- **Excluded Artifacts**: Dependencies (`node_modules`), virtual environments (`.venv`), databases (`*.db`), build outputs (`dist`), and large media screen recordings (`*.mp4`) are strictly ignored.
- **Code Integrity**: All original source code, test suites, datasets, and reports have been preserved and verified.

---

## 👤 Author

- **Prakhar Bhagbole**
- GitHub: [@ErdtreeBound-404](https://github.com/ErdtreeBound-404)
