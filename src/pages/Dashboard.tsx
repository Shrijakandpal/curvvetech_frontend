import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import DeviceFilter from "../components/DeviceFilter";
import DeviceTable from "../components/DeviceTable";
import DeviceStatusChart from "../components/DeviceStatusChart";

type Device = {
  id: number;
  name: string;
  status: string;
  lastUpdated: string;
  type?: string;
  ipAddress?: string;
  location?: string;
  manufacturer?: string;
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState<"name" | "status" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [devices, setDevices] = useState<Device[]>([]);


  useEffect(() => {
    fetch("/devices.json")
      .then((res) => res.json())
      .then((data: Device[]) => setDevices(data))
      .catch((err) => console.error("Error loading devices:", err));
  }, []);

  const filteredDevices = devices
    .filter(
      (device) =>
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.id.toString().includes(searchQuery)
    )
    .filter((device) => (statusFilter === "all" ? true : device.status === statusFilter));

  const handleSort = (field: "name" | "status") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
      <h1 className={styles.heading}>Device Dashboard</h1>

      <div className={styles.filterWrapper}>
        <DeviceFilter
          onSearch={setSearchQuery}
          onStatusFilter={setStatusFilter}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          isDarkMode={isDarkMode}
        />
      </div>

      <div className={styles.tableWrapper}>
        <DeviceTable
          devices={filteredDevices} 
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          sortField={sortField}
          sortOrder={sortOrder}
          isDarkMode={isDarkMode}
        />
      </div>

      <div className={styles.chartWrapper}>
        <DeviceStatusChart devices={filteredDevices} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}
