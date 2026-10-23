# Scapy Network Packet Analyzer
# Run with root privileges: sudo python3 scapy_sniffer.py

from scapy.all import sniff, IP, TCP, UDP, ICMP
from datetime import datetime
import csv
from collections import Counter
import matplotlib.pyplot as plt

# Store captured packets
packets = []


# ==========================================
# PROCESS PACKET
# ==========================================

def process_packet(packet):
    if IP in packet:
        # Get source and destination IP
        source_ip = packet[IP].src
        destination_ip = packet[IP].dst

        # Identify protocol
        if TCP in packet:
            protocol = "TCP"
        elif UDP in packet:
            protocol = "UDP"
        elif ICMP in packet:
            protocol = "ICMP"
        else:
            protocol = str(packet[IP].proto)

        # Get packet length
        packet_length = len(packet)

        # Get first 50 bytes of packet data
        packet_data = bytes(packet)[:50].hex()

        # Get packet time
        packet_time = datetime.now().strftime("%H:%M:%S")

        # Store packet information
        packet_info = {
            "time": packet_time,
            "source": source_ip,
            "destination": destination_ip,
            "protocol": protocol,
            "length": packet_length,
            "data": packet_data
        }

        packets.append(packet_info)

        # Display packet information
        print(
            f"{packet_time:<10}"
            f"{source_ip:<18}"
            f"{destination_ip:<18}"
            f"{protocol:<8}"
            f"{packet_length} bytes"
        )


# ==========================================
# PROGRAM HEADER
# ==========================================

print("=" * 75)
print("                 NETWORK PACKET ANALYZER")
print("=" * 75)


# ==========================================
# CAPTURE MODE
# ==========================================

print("\nSelect capture mode:")
print("1. All packets")
print("2. TCP packets")
print("3. UDP packets")
print("4. ICMP packets")

choice = input("\nEnter choice: ")

if choice == "1":
    capture_filter = None
elif choice == "2":
    capture_filter = "tcp"
elif choice == "3":
    capture_filter = "udp"
elif choice == "4":
    capture_filter = "icmp"
else:
    print("Invalid choice. Capturing all packets.")
    capture_filter = None


# ==========================================
# START CAPTURE
# ==========================================

print("\nStarting packet capture...")
print("Capturing 50 packets...\n")

# Table heading
print(
    f"{'TIME':<10}"
    f"{'SOURCE IP':<18}"
    f"{'DESTINATION IP':<18}"
    f"{'PROTOCOL':<8}"
    f"LENGTH"
)

print("-" * 75)

# Capture 50 packets
sniff(
    filter=capture_filter,
    prn=process_packet,
    count=50,
    store=False
)


# ==========================================
# PACKET SUMMARY
# ==========================================

print("\nPacket capture completed.")

# Count protocols
protocol_count = Counter(
    packet["protocol"]
    for packet in packets
)

print("\n========== PACKET SUMMARY ==========")
print(f"Total packets: {len(packets)}")

for protocol, count in protocol_count.items():
    print(f"{protocol}: {count}")


# ==========================================
# PIE CHART
# ==========================================

if packets:
    print("\nGenerating protocol distribution graph...")
    plt.figure(figsize=(7, 7))
    plt.pie(
        protocol_count.values(),
        labels=protocol_count.keys(),
        autopct="%1.1f%%",
        startangle=90
    )
    plt.title("Network Protocol Distribution")
    plt.show()


# ==========================================
# SAVE PACKETS TO CSV
# ==========================================

if packets:
    with open(
        "captured_packets.csv",
        "w",
        newline=""
    ) as file:
        writer = csv.DictWriter(
            file,
            fieldnames=[
                "time",
                "source",
                "destination",
                "protocol",
                "length",
                "data"
            ]
        )
        writer.writeheader()
        writer.writerows(packets)

    print(
        f"\n{len(packets)} packets saved to captured_packets.csv"
    )
else:
    print("No packets captured.")


# ==========================================
# PROGRAM COMPLETED
# ==========================================

print("\n========================================")
print("        ANALYSIS COMPLETED")
print("========================================")
