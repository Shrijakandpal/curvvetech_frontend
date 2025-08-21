import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

type DeviceStatusChartProps = {
  devices: { id: number; status: string }[];
  isDarkMode: boolean;
};

const LIGHT_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const DARK_COLORS = ["#4da6ff", "#33cc99", "#ffdd33", "#ff9933"];

export default function DeviceStatusChart({ devices, isDarkMode }: DeviceStatusChartProps) {
  const statusCounts = devices.reduce((acc: Record<string, number>, device) => {
    acc[device.status] = (acc[device.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status],
  }));

  const COLORS = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label={{ fill: isDarkMode ? "#f5f5f5" : "#000" }}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          backgroundColor: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#f5f5f5" : "#000",
        }}
      />
      <Legend
        wrapperStyle={{
          color: isDarkMode ? "#f5f5f5" : "#000",
        }}
      />
    </PieChart>
  );
}
