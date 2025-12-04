import React from "react";

const icons: Record<string, string> = {
  Kitsune: "🦊",
  Tengu: "👺",
  Kappa: "🐢",
  Oni: "👹",
  Yurei: "👻",
  Default: "👾",
};

const colors: Record<string, string> = {
  Kitsune: "#f97316", 
  Tengu: "#ef4444", 
  Kappa: "#22c55e", 
  Oni: "#a855f7", 
};

export const YokaiIcon = ({ name }: { name: string }) => {
  const icon = icons[name] || icons["Default"];
  const color = colors[name] || "#00f3ff";

  return (
    <div
      style={{
        borderColor: color,
        boxShadow: `0 0 15px ${color}40`,
        background: `linear-gradient(135deg, ${color}10, transparent)`,
      }}
      className="flex items-center justify-center w-16 h-16 border-2 rounded-lg text-3xl"
    >
      <span style={{ filter: `drop-shadow(0 0 5px ${color})` }}>{icon}</span>
    </div>
  );
};
