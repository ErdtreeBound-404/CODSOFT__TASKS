export type ProtocolType = 'TCP' | 'UDP' | 'ICMP';

export interface Packet {
  id: number;
  timestamp: number;
  timeOffset: string; // e.g. "0.004120"
  srcIp: string;
  srcPort?: number;
  dstIp: string;
  dstPort?: number;
  protocol: ProtocolType;
  length: number; // in bytes
  info: string;
  flags?: string[]; // e.g. ['SYN', 'ACK']
  srcMac: string;
  dstMac: string;
  ttl: number;
  checksum: string;
  identification: string;
  sequenceNumber?: number;
  ackNumber?: number;
  windowSize?: number;
  icmpType?: string; // e.g. "Echo (ping) request"
  icmpCode?: number;
  payloadHex: string;
  payloadAscii: string;
  threatLevel?: 'normal' | 'suspicious' | 'warning';
}

export interface NetworkInterface {
  name: string;
  ip: string;
  mac: string;
  status: 'up' | 'down';
  rxBytes: number;
  txBytes: number;
  rxPackets: number;
  txPackets: number;
  mtu: number;
}

export interface AnalyzerSettings {
  interface: string;
  promiscuousMode: boolean;
  bufferLimit: number;
  snapshotLength: number;
  packetSpeed: number; // packets per second: 1, 5, 10, 25, 50
  soundEnabled: boolean;
  filterBpf: string;
  theme: 'cyber-slate' | 'matrix-dark' | 'obsidian';
  autoStopPackets: number; // 0 = disabled
}

export interface AnalystUser {
  name: string;
  role: string;
  analystId: string;
  sessionStartTime: number;
  avatarSeed: string;
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  sourceIp: string;
  targetIp: string;
  recommendation: string;
}

export interface CsvPacket {
  id: number;
  time: string;
  source: string;
  destination: string;
  protocol: ProtocolType;
  length: number;
  data: string;
  alert?: string;
}

export interface BackendStatus {
  isCapturing: boolean;
  mode: string;
  startedAt: string | null;
  sessionPackets: number;
  totalCsvPackets: number;
  csvSizeBytes: number;
  csvFilePath: string;
  pythonScript: string;
}

