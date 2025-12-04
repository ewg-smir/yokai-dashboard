"use client";
import { useQuery } from "@tanstack/react-query";
import { Anomaly } from "@/entities/Anomaly";

export const StatsPanel = () => {
  const { data: anomalies } = useQuery<Anomaly[]>({ queryKey: ["anomalies"] });

  if (!anomalies) return null;

  const total = anomalies.length;
  const active = anomalies.filter((a) => a.status === "ACTIVE").length;
  const captured = anomalies.filter((a) => a.status === "CAPTURED").length;
  const critical = anomalies.filter(
    (a) => a.threatLevel === "CRITICAL" && a.status === "ACTIVE"
  ).length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "40px",
      }}
    >
      <StatCard label="TOTAL TARGETS" value={total} color="#00f3ff" />
      <StatCard label="ACTIVE THREATS" value={active} color="#f97316" />
      <StatCard label="CONTAINED" value={captured} color="#22c55e" />
      <StatCard
        label="CRITICAL"
        value={critical}
        color="#ef4444"
        isBlinking={critical > 0}
      />
    </div>
  );
};

// 1. Создаем интерфейс для пропсов
interface StatCardProps {
  label: string;
  value: number | string;
  color: string;
  isBlinking?: boolean; // ? означает, что поле необязательное
}

// 2. Используем StatCardProps вместо any
const StatCard = ({ label, value, color, isBlinking }: StatCardProps) => (
  <div
    style={{
      background: "rgba(20, 20, 20, 0.7)",
      border: `1px solid ${color}`,
      padding: "15px",
      borderRadius: "8px",
      boxShadow: `0 0 10px ${color}20`,
    }}
  >
    <div
      style={{
        color: "#6b7280",
        fontSize: "0.7rem",
        letterSpacing: "1px",
        marginBottom: "5px",
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontSize: "2rem",
        fontFamily: "var(--font-display)",
        color: color,
        animation: isBlinking ? "pulse 1s infinite" : "none",
      }}
    >
      {value}
    </div>
  </div>
);
