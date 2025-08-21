import React, { useState } from "react";
import styles from "./DeviceTable.module.css";
import DeviceModal from "./DeviceModal";

type Device = {
  id: number;
  name: string;
  status: string;
  lastUpdated: string;
  type?: string;
  ipAddress?: string;
  location?: string;
  manufacturer?: string;
  model?: string;
  osVersion?: string;
  uptime?: string;
  notes?: string;
};

type DeviceTableProps = {
  devices: Device[]; 
  searchQuery: string;
  statusFilter: string;
  sortField: "name" | "status" | null;
  sortOrder: "asc" | "desc";
  isDarkMode?: boolean;
};

const DeviceTable: React.FC<DeviceTableProps> = ({
  devices,
  searchQuery,
  statusFilter,
  sortField,
  sortOrder,
  isDarkMode = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const itemsPerPage = 5;

  // Sort the devices
  const sortedDevices = [...devices].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField].toString().toLowerCase();
    const valB = b[sortField].toString().toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDevices = sortedDevices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedDevices.length / itemsPerPage);

  return (
    <div className={isDarkMode ? styles.darkTableWrapper : ""}>
      <table className={`${styles.deviceTable} ${isDarkMode ? styles.darkTable : ""}`}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {currentDevices.map((device) => (
            <tr
              key={device.id}
              onClick={() => setSelectedDevice(device)}
              className={styles.clickableRow}
            >
              <td>{device.id}</td>
              <td>{device.name}</td>
              <td
                className={
                  device.status === "active"
                    ? styles.active
                    : device.status === "inactive"
                    ? styles.inactive
                    : styles.maintenance
                }
              >
                {device.status}
              </td>
              <td>{new Date(device.lastUpdated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {selectedDevice && (
        <DeviceModal
          device={{
            ...selectedDevice,
            id: selectedDevice.id.toString(),
            type: selectedDevice.type || "Unknown",
            lastActive: selectedDevice.lastUpdated,
          }}
          onClose={() => setSelectedDevice(null)}
        />
      )}
    </div>
  );
};

export default DeviceTable;
