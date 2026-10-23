# Phishing Awareness Training Program

An interactive, gamified cybersecurity awareness training platform designed to educate users, employees, and students on identifying, avoiding, and reporting phishing and social engineering attacks.

---

## 🚀 Overview

The **Phishing Awareness Training Program** combines interactive theory modules, real-world case studies, hands-on phishing detection simulations, deep-inspection comparison tools, and assessment quizzes with certificate generation.

---

## ✨ Key Features

- **Interactive Training Modules**: Step-by-step educational modules covering email phishing, spear phishing, smishing (SMS), vishing (voice), clone phishing, and credential harvesting.
- **Spot-the-Phish Simulator**: Realistic interactive simulation presenting inbox scenarios where users evaluate email headers, sender domains, urgency signals, and suspicious attachments.
- **Real vs. Fake Inspector**: Side-by-side header, URL, and content inspector illustrating the subtle nuances between legitimate brand communications and fraudulent replicas.
- **Interactive Slide Decks & Case Studies**: In-depth analysis of notable real-world corporate data breaches and social engineering campaigns.
- **Precaution Toolbox**: Practical checklist and defensive best practices (multi-factor authentication, email filters, verification protocols).
- **Assessment Quiz & Certification**: Knowledge evaluation quiz with dynamic scoring and a personalized certificate of completion.

---

## 🛠️ Tech Stack

- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons & UI**: Lucide React
- **Data & Content**: TypeScript structured schemas (`modulesData.ts`, `quizData.ts`, `scenariosData.ts`, `caseStudiesData.ts`, `slidesData.ts`)

---

## 📂 Project Structure

```
Phishing-Awareness-Training-Program/
├── src/
│   ├── components/
│   │   ├── Certificate.tsx            # Certificate of completion generator
│   │   ├── DashboardOverview.tsx      # Training dashboard & progress metrics
│   │   ├── FinalQuiz.tsx              # Comprehensive phishing quiz
│   │   ├── Header.tsx                 # Navigation bar
│   │   ├── ModuleViewer.tsx           # Step-by-step learning modules
│   │   ├── RealVsFakeInspector.tsx    # Comparison analysis tool
│   │   ├── Sidebar.tsx                # App navigation sidebar
│   │   ├── SlideDeck.tsx              # Presentation slides
│   │   ├── SpotThePhishSimulator.tsx  # Interactive phishing simulation
│   │   └── ToolboxAndPrecautions.tsx  # Security recommendations & precautions
│   ├── data/                          # Training scenarios, modules, quizzes, case studies
│   ├── types/                         # TypeScript interfaces
│   ├── App.tsx                        # Main application controller
│   └── main.tsx                       # React DOM entry point
├── package.json                       # Dependencies and build scripts
├── tsconfig.json                      # TypeScript configuration
├── vite.config.ts                     # Vite bundler configuration
└── README.md                          # Project documentation
```

---

## ⚙️ Prerequisites

- **Node.js** (v18+ recommended) or **Bun**

---

## 🚀 Getting Started

```bash
# Navigate to the project directory
cd Phishing-Awareness-Training-Program

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Open your browser at `http://localhost:3000` to interact with the training program.

---

## 🧪 Building for Production

```bash
npm run build
npm run preview
```
