# Network Packet Analyzer

A comprehensive, real-time network traffic monitoring, packet inspection, and protocol analysis platform built with a high-performance React + TypeScript frontend and Python packet processing engine.

---

## 🚀 Overview

The **Network Packet Analyzer** provides deep visibility into network communications, capturing packets, dissecting multi-layer protocol headers, detecting anomalies, and visualizing throughput metrics in real-time. It supports both live network sniffing via Scapy and offline PCAP/CSV traffic replay.

---

## ✨ Key Features

- **Live Packet Capture & Sniffing**: Uses Scapy to capture live Ethernet, IP, TCP, UDP, ICMP, and DNS traffic.
- **Offline Traffic Replay**: Ingest and analyze pre-recorded packet captures (`captured_packets.csv`, `replay_packets.csv`).
- **Deep Protocol Dissection**: Detailed header breakdowns including IP addresses, ports, sequence numbers, flags, and payload inspection.
- **Real-Time Interactive Dashboard**: Built with React, Vite, and Tailwind CSS, featuring live packet feeds, protocol distribution charts, bandwidth metrics, and filtering.
- **WebSocket Streaming**: Seamless bidirectional communication between the network capture engine and the frontend visualizer.
- **Security & Anomaly Detection**: Highlights suspicious traffic patterns, potential port scans, and unusual payload sizes.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Backend / Scripts**:
  - Python 3 (`scapy`, `pandas`, `socket`, `csv`)
  - Node.js / Bun (`server.ts`, WebSocket `ws`)
- **Data Formats**: CSV (`captured_packets.csv`, `replay_packets.csv`), JSON

---

## 📂 Project Structure

```
Network-Packet-Analyzer/
├── src/
│   ├── components/         # React dashboard, analysis, packet modals, filters
│   ├── types/              # TypeScript definitions for network packets & protocols
│   ├── utils/              # Simulated packet generators and helper utilities
│   ├── App.tsx             # Main dashboard layout
│   └── main.tsx            # Application entry point
├── public/                 # Static assets & logos
├── packet_analyzer.py      # Python traffic analyzer and statistics processor
├── scapy_sniffer.py        # Python live packet capture script using Scapy
├── server.ts               # WebSocket bridge for real-time packet streaming
├── captured_packets.csv    # Sample captured packet data
├── replay_packets.csv      # Extended dataset for offline traffic replay
├── package.json            # Node.js dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

---

## ⚙️ Prerequisites

1. **Node.js** (v18+ recommended) or **Bun**
2. **Python** (v3.10+ recommended)
3. *(Optional for live capture on Windows)*: **[Npcap](https://npcap.com/)** in WinPcap API-compatible mode.

---

## 🚀 Getting Started

### 1. Frontend Interface

```bash
# Navigate to the project directory
cd Network-Packet-Analyzer

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open your browser at `http://localhost:3000` (or the URL displayed in the console).

### 2. Running Python Packet Tools

```bash
# Ensure required Python packages are installed
python -m pip install scapy pandas

# Run the packet analyzer on CSV datasets
python packet_analyzer.py

# Run live packet sniffing (requires administrator privileges / root)
python scapy_sniffer.py
```

### 3. WebSocket Streaming Server (Optional)

```bash
# Run the streaming server
npx tsx server.ts
```
