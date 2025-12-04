import { AnomalyList } from "@/widgets/AnomalyList";
import { StatsPanel } from "@/widgets/StatsPanel";

export default function MonitoringPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <header
        style={{
          marginBottom: "40px",
          borderBottom: "1px solid #333",
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <div>
          <div
            style={{
              color: "var(--neon-green)",
              fontSize: "0.8rem",
              letterSpacing: "3px",
              marginBottom: "5px",
            }}
          >
            SYSTEM STATUS: ONLINE
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              textTransform: "uppercase",
              textShadow: "0 0 10px rgba(0, 243, 255, 0.5)",
            }}
          >
            Yokai Radar <span style={{ color: "var(--neon-red)" }}></span>{" "}
            Tokyo-3
          </h1>
        </div>
        <div
          style={{
            textAlign: "right",
            fontSize: "0.9rem",
            color: "var(--text-dim)",
          }}
        >
          SECTOR: 7G
          <br />
          SENSORS: ACTIVE
        </div>
      </header>
      <StatsPanel />
      <AnomalyList />
    </main>
  );
}
