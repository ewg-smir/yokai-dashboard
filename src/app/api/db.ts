export type AnomalyStatus = "ACTIVE" | "CAPTURED";
export type ThreatLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Anomaly {
  id: string;
  name: string;
  threatLevel: ThreatLevel;
  location: string;
  status: AnomalyStatus;
}

let anomalies: Anomaly[] = [
  {
    id: "1",
    name: "Kitsune",
    threatLevel: "MEDIUM",
    location: "Shibuya",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Tengu",
    threatLevel: "HIGH",
    location: "Shinjuku",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Kappa",
    threatLevel: "LOW",
    location: "Sumida River",
    status: "ACTIVE",
  },
  {
    id: "4",
    name: "Oni",
    threatLevel: "CRITICAL",
    location: "Roppongi",
    status: "ACTIVE",
  },
];

export const db = {
  getAll: () => anomalies,
  update: (id: string, data: Partial<Anomaly>) => {
    anomalies = anomalies.map((a) => (a.id === id ? { ...a, ...data } : a));
    return anomalies.find((a) => a.id === id);
  },
  randomUpdate: () => {
    const activeAnomalies = anomalies.filter((a) => a.status === "ACTIVE");

    if (activeAnomalies.length === 0) return null;

    const randomIdx = Math.floor(Math.random() * activeAnomalies.length);
    const targetId = activeAnomalies[randomIdx].id;

    const mainIndex = anomalies.findIndex((a) => a.id === targetId);

    const levels: ThreatLevel[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
    const newLevel = levels[Math.floor(Math.random() * levels.length)];

    if (mainIndex !== -1) {
      anomalies[mainIndex].threatLevel = newLevel;
      return anomalies[mainIndex];
    }
    return null;
  },
};
