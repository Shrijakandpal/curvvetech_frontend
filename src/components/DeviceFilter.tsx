import { useState } from "react";
import styles from "./DeviceFilter.module.css";

interface Props {
  onSearch: (q: string) => void;
  onStatusFilter: (s: string) => void;
  onSort: (field: "name" | "status") => void;
  sortField: "name" | "status" | null;
  sortOrder: "asc" | "desc";
  onToggleTheme: () => void;
  isDarkMode: boolean; 
}

export default function DeviceFilter({
  onSearch,
  onStatusFilter,
  onSort,
  sortField,
  sortOrder,
  onToggleTheme,
  isDarkMode,
}: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  return (
    <div
      className={`${styles.filterContainer} ${
        isDarkMode ? styles.dark : ""
      }`}
    >
      <input
        className={styles.searchInput}
        placeholder="Search by name or ID"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearch(e.target.value);
        }}
      />

      <select
        className={styles.dropdown}
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          onStatusFilter(e.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <select
        className={styles.dropdown}
        onChange={(e) => onSort(e.target.value as "name" | "status")}
      >
        <option value="">Sort By</option>
        <option value="name">
          Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </option>
        <option value="status">
          Status {sortField === "status" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
        </option>
      </select>

      <button
        className={`${styles.toggleBtn} ${
          isDarkMode ? styles.darkToggleBtn : ""
        }`}
        onClick={onToggleTheme}
      >
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}
