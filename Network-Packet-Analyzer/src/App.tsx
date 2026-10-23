/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { Navigation, ActiveTab } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { OverviewView } from './components/OverviewView';
import { PacketsView } from './components/PacketsView';
import { AnalysisView } from './components/AnalysisView';
import { SettingsModal } from './components/SettingsModal';
import { LogoutModal } from './components/LogoutModal';
import { ProtocolDetailModal } from './components/ProtocolDetailModal';
import { PacketDetailModal } from './components/PacketDetailModal';
import { PythonBackendModal } from './components/PythonBackendModal';
import { LoginView } from './components/LoginView';
import {
  Packet,
  ProtocolType,
  AnalyzerSettings,
  AnalystUser,
  NetworkInterface,
  BackendStatus,
  CsvPacket,
} from './types/network';
import { generateSimulatedPacket, playPacketChirp, csvPacketToPacket } from './utils/packetGenerator';

const INITIAL_SETTINGS: AnalyzerSettings = {
  interface: 'eth0 (192.168.1.105)',
  promiscuousMode: true,
  bufferLimit: 5000,
  snapshotLength: 65535,
  packetSpeed: 1, // timed replay speed
  soundEnabled: false,
  filterBpf: '',
  theme: 'cyber-slate',
  autoStopPackets: 0,
};

const INITIAL_USER: AnalystUser = {
  name: 'Prakhar',
  role: 'Student',
  analystId: 'STU-2026',
  sessionStartTime: Date.now() - 1000 * 60 * 32, // 32 minutes ago
  avatarSeed: 'Prakhar',
};

const INITIAL_INTERFACES: NetworkInterface[] = [
  {
    name: 'eth0',
    ip: '192.168.1.105',
    mac: '00:1a:2b:3c:4d:5e',
    status: 'up',
    rxBytes: 1420800,
    txBytes: 894200,
    rxPackets: 1840,
    txPackets: 1210,
    mtu: 1500,
  },
  {
    name: 'wlan0',
    ip: '10.0.0.45',
    mac: '52:54:00:12:34:56',
    status: 'up',
    rxBytes: 420500,
    txBytes: 198000,
    rxPackets: 512,
    txPackets: 340,
    mtu: 1500,
  },
  {
    name: 'lo',
    ip: '127.0.0.1',
    mac: '00:00:00:00:00:00',
    status: 'up',
    rxBytes: 98200,
    txBytes: 98200,
    rxPackets: 142,
    txPackets: 142,
    mtu: 65536,
  },
];

export default function App() {
  // Authentication session
  const [currentUser, setCurrentUser] = useState<AnalystUser | null>(INITIAL_USER);

  // Active view tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('DASHBOARD');

  // Capturing State & Backend Sync
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null);
  const [activeProtocols, setActiveProtocols] = useState<ProtocolType[]>(['TCP', 'UDP', 'ICMP']);
  const [interfaces, setInterfaces] = useState<NetworkInterface[]>(INITIAL_INTERFACES);
  const [settings, setSettings] = useState<AnalyzerSettings>(INITIAL_SETTINGS);

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isPythonModalOpen, setIsPythonModalOpen] = useState(false);
  const [inspectedProtocol, setInspectedProtocol] = useState<ProtocolType | null>(null);
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
  const [initialProtocolFilter, setInitialProtocolFilter] = useState<ProtocolType | null>(null);

  // Helper to sync packets from backend CSV
  const syncFromBackend = useCallback(async () => {
    try {
      const [packetsRes, statusRes] = await Promise.all([
        fetch('/api/packets?limit=50'),
        fetch('/api/status'),
      ]);

      if (statusRes.ok) {
        const statusData: BackendStatus = await statusRes.json();
        setBackendStatus(statusData);
        setIsCapturing(statusData.isCapturing);
      }

      if (packetsRes.ok) {
        const packetsData = await packetsRes.json();
        if (Array.isArray(packetsData.packets) && packetsData.packets.length > 0) {
          const converted = packetsData.packets.map((p: CsvPacket) => csvPacketToPacket(p));
          setPackets(converted);
        }
      }
    } catch (err) {
      console.warn('Backend sync failed, falling back to local simulation:', err);
    }
  }, []);

  // Initial load on mount
  useEffect(() => {
    syncFromBackend();
  }, [syncFromBackend]);

  // Periodic polling to keep CSV and UI in exact parity
  useEffect(() => {
    if (!currentUser) return;
    const intervalMs = isCapturing ? 1200 : 3500;
    const interval = setInterval(() => {
      syncFromBackend();
    }, intervalMs);
    return () => clearInterval(interval);
  }, [isCapturing, currentUser, syncFromBackend]);

  // Start / Stop capture with Python backend integration
  const handleToggleCapture = useCallback(async () => {
    const nextState = !isCapturing;
    setIsCapturing(nextState);

    try {
      if (nextState) {
        // Determine mode from active protocols
        const mode =
          activeProtocols.length === 1
            ? activeProtocols[0].toLowerCase()
            : 'all';
        await fetch('/api/capture/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode, speed: settings.packetSpeed }),
        });
      } else {
        await fetch('/api/capture/stop', { method: 'POST' });
      }
      syncFromBackend();
    } catch (e) {
      console.error('Error toggling capture backend:', e);
    }
  }, [isCapturing, activeProtocols, settings.packetSpeed, syncFromBackend]);

  // Protocol filter toggle on dashboard
  const handleToggleProtocol = useCallback((proto: ProtocolType) => {
    setActiveProtocols((prev) => {
      if (prev.includes(proto)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((p) => p !== proto);
      } else {
        return [...prev, proto];
      }
    });
  }, []);

  // Inject a simulated test packet into both state and captured_packets.csv
  const handleInjectPacket = useCallback(async (proto: ProtocolType) => {
    const newPacket = generateSimulatedPacket([proto]);
    setPackets((prev) => [...prev, newPacket]);

    if (settings.soundEnabled) {
      playPacketChirp(proto);
    }

    try {
      await fetch('/api/inject-packet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          protocol: proto,
          source: newPacket.srcIp,
          destination: newPacket.dstIp,
          length: newPacket.length,
        }),
      });
      syncFromBackend();
    } catch {
      // Local state already updated
    }
  }, [settings.soundEnabled, syncFromBackend]);

  // Clear packet buffer and reset captured_packets.csv
  const handleClearPackets = useCallback(async () => {
    setPackets([]);
    try {
      await fetch('/api/clear-csv', { method: 'POST' });
      syncFromBackend();
    } catch (e) {
      console.error('Failed to clear backend CSV:', e);
    }
  }, [syncFromBackend]);

  // Navigate to packets filtered by specific protocol
  const handleFilterProtocolInPackets = useCallback((proto: ProtocolType) => {
    setInitialProtocolFilter(proto);
    setActiveTab('PACKETS');
  }, []);

  // Compute totals
  const totalBytes = packets.reduce((acc, p) => acc + p.length, 0);
  const anomalyCount = packets.filter((p) => p.threatLevel && p.threatLevel !== 'normal').length;

  // If user is logged out, render terminal access login screen
  if (!currentUser) {
    return <LoginView onLogin={(user) => setCurrentUser(user)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* 1. Header with App Title, Gemini Logo, Python status, and ⚙ SETTING button */}
      <Header
        isCapturing={isCapturing}
        settings={settings}
        packetCount={backendStatus?.totalCsvPackets ?? packets.length}
        backendStatus={backendStatus}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenPythonBackend={() => setIsPythonModalOpen(true)}
      />

      {/* 2. Navigation bar with DASHBOARD, OVERVIEW, PACKETS, ANALYSIS, and Log Out */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'PACKETS') setInitialProtocolFilter(null);
        }}
        onOpenLogout={() => setIsLogoutOpen(true)}
        packetCount={packets.length}
        anomalyCount={anomalyCount}
        user={currentUser}
      />

      {/* 3. Main Body Container */}
      <main className="flex-1 px-4 sm:px-8 pt-6">
        {activeTab === 'DASHBOARD' && (
          <DashboardView
            isCapturing={isCapturing}
            onToggleCapture={handleToggleCapture}
            packets={packets}
            activeProtocols={activeProtocols}
            onToggleProtocol={handleToggleProtocol}
            onOpenProtocolDetail={(proto) => setInspectedProtocol(proto)}
            onSelectPacket={(pkt) => setSelectedPacket(pkt)}
            onNavigateToPackets={() => setActiveTab('PACKETS')}
            onNavigateToAnalysis={() => setActiveTab('ANALYSIS')}
            onOpenPythonBackend={() => setIsPythonModalOpen(true)}
          />
        )}

        {activeTab === 'OVERVIEW' && (
          <OverviewView
            packets={packets}
            interfaces={interfaces}
            onSelectProtocol={(proto) => setInspectedProtocol(proto)}
            onSelectPacket={(pkt) => setSelectedPacket(pkt)}
          />
        )}

        {activeTab === 'PACKETS' && (
          <PacketsView
            packets={packets}
            isCapturing={isCapturing}
            onToggleCapture={handleToggleCapture}
            onClearPackets={handleClearPackets}
            onSelectPacket={(pkt) => setSelectedPacket(pkt)}
            onInjectPacket={handleInjectPacket}
            initialProtocolFilter={initialProtocolFilter}
          />
        )}

        {activeTab === 'ANALYSIS' && (
          <AnalysisView
            packets={packets}
            onSelectPacketById={(id) => {
              const pkt = packets.find((p) => p.id === id);
              if (pkt) setSelectedPacket(pkt);
            }}
          />
        )}
      </main>

      {/* 4. Modals for all options */}
      {/* ⚙ SETTING Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        settings={settings}
        onSave={(newSettings) => setSettings(newSettings)}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Python Backend & CSV Management Modal */}
      <PythonBackendModal
        isOpen={isPythonModalOpen}
        status={backendStatus}
        isCapturing={isCapturing}
        onToggleCapture={handleToggleCapture}
        onRefresh={syncFromBackend}
        onClose={() => setIsPythonModalOpen(false)}
      />

      {/* Log Out Modal */}
      <LogoutModal
        isOpen={isLogoutOpen}
        user={currentUser}
        packetCount={packets.length}
        totalBytes={totalBytes}
        anomalyCount={anomalyCount}
        onConfirmLogout={() => {
          setIsCapturing(false);
          setIsLogoutOpen(false);
          setCurrentUser(null);
        }}
        onSwitchProfile={(role, name) => {
          setCurrentUser((prev) =>
            prev
              ? {
                  ...prev,
                  role,
                  name,
                  analystId: `ANL-${Math.floor(1000 + Math.random() * 9000)}`,
                  sessionStartTime: Date.now(),
                }
              : null
          );
        }}
        onClose={() => setIsLogoutOpen(false)}
      />

      {/* Protocol Detail Modal (for TCP, UDP, ICMP) */}
      <ProtocolDetailModal
        protocol={inspectedProtocol}
        packets={packets}
        onClose={() => setInspectedProtocol(null)}
        onFilterProtocol={handleFilterProtocolInPackets}
        onInjectPacket={handleInjectPacket}
      />

      {/* Deep Packet Inspection (DPI) Modal for any packet */}
      <PacketDetailModal
        packet={selectedPacket}
        onClose={() => setSelectedPacket(null)}
      />
    </div>
  );
}
