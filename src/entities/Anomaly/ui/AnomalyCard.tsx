import React from "react";
import styles from "./AnomalyCard.module.scss";
import { Anomaly } from "../model/schema";
import clsx from "clsx";
import { YokaiIcon } from "./YokaiIcon"; // <--- Импорт иконки

interface Props {
  anomaly: Anomaly;
  actionSlot?: React.ReactNode;
}

export const AnomalyCard: React.FC<Props> = ({ anomaly, actionSlot }) => {
  return (
    <div
      className={clsx(
        styles.card,
        styles[anomaly.threatLevel],
        anomaly.status === "CAPTURED" && styles.captured
      )}
    >
      {/* Декоративные уголки */}
      <div className={styles.corner_tl}></div>
      <div className={styles.corner_br}></div>

      <div className={styles.header}>
        <YokaiIcon name={anomaly.name} />
        <div className={styles.meta}>
          <div className={styles.id}>ID: {anomaly.id.padStart(4, "0")}</div>
          <h3 className={styles.name}>{anomaly.name}</h3>
          <div className={styles.location}>📍 {anomaly.location}</div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statRow}>
          <span>THREAT LEVEL</span>
          <span
            className={clsx(styles.levelValue, styles[anomaly.threatLevel])}
          >
            {anomaly.threatLevel}
          </span>
        </div>
        <div className={styles.statRow}>
          <span>STATUS</span>
          <span
            className={clsx(
              styles.statusValue,
              anomaly.status === "ACTIVE" ? styles.active : styles.contained
            )}
          >
            {anomaly.status}
          </span>
        </div>
      </div>

      <div className={styles.actions}>{actionSlot}</div>
    </div>
  );
};
