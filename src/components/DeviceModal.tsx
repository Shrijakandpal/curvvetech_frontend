import { useEffect } from "react";
import styles from "./DeviceModal.module.css";

interface Device {
  id: string;
  name: string;
  type: string;
  status: string;
  lastActive: string;
  ipAddress?: string;
  location?: string;
  manufacturer?: string;
  model?: string;
  osVersion?: string;
  uptime?: string;
  notes?: string;
}

interface Props {
  device: Device | null;
  onClose: () => void;
}

export default function DeviceModal({ device, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!device) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✖</button>
        <h2>{device.name}</h2>
        <p><b>ID:</b> {device.id}</p>
        <p><b>Type:</b> {device.type}</p>
        <p><b>Status:</b> {device.status}</p>
        <p><b>Last Active:</b> {device.lastActive}</p>
        <p><b>IP Address:</b> {device.ipAddress || "N/A"}</p>
        <p><b>Location:</b> {device.location || "N/A"}</p>
        <p><b>Manufacturer:</b> {device.manufacturer || "N/A"}</p>
        <p><b>Model:</b> {device.model || "N/A"}</p>
        <p><b>OS Version:</b> {device.osVersion || "N/A"}</p>
        <p><b>Uptime:</b> {device.uptime || "N/A"}</p>
        <p><b>Notes:</b> {device.notes || "N/A"}</p>
      </div>
    </div>
  );
}
