"use client";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AnomalySchema, AnomalyCard, Anomaly } from "@/entities/Anomaly";
import { CaptureButton } from "@/features/CaptureAnomaly";
import styles from "./AnomalyList.module.scss";

const ListSchema = z.array(AnomalySchema);

export const AnomalyList = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = new EventSource("/api/stream");

    eventSource.onmessage = (event) => {
      const updatedAnomaly: Anomaly = JSON.parse(event.data);

      queryClient.setQueryData<Anomaly[]>(["anomalies"], (old) => {
        if (!old) return old;

        return old.map((localAnomaly) => {
          if (localAnomaly.id === updatedAnomaly.id) {
            if (localAnomaly.status === "CAPTURED") {
              return localAnomaly;
            }
            return updatedAnomaly;
          }
          return localAnomaly;
        });
      });
    };

    return () => eventSource.close();
  }, [queryClient]);

  const { data: anomalies, isLoading } = useQuery({
    queryKey: ["anomalies"],
    queryFn: async () => {
      const res = await fetch("/api/anomalies");
      const data = await res.json();
      return ListSchema.parse(data); 
    },
  });

  useEffect(() => {
    const eventSource = new EventSource("/api/stream");

    eventSource.onmessage = (event) => {
      const updatedAnomaly: Anomaly = JSON.parse(event.data);

      queryClient.setQueryData<Anomaly[]>(["anomalies"], (old) => {
        if (!old) return old;
        return old.map((a) =>
          a.id === updatedAnomaly.id ? updatedAnomaly : a
        );
      });
    };

    return () => eventSource.close();
  }, [queryClient]);

  if (isLoading)
    return <div className={styles.loading}>Scanning spiritual energy...</div>;

  return (
    <div className={styles.grid}>
      {anomalies?.map((anomaly) => (
        <AnomalyCard
          key={anomaly.id}
          anomaly={anomaly}
          actionSlot={
            <CaptureButton
              id={anomaly.id}
              isCaptured={anomaly.status === "CAPTURED"}
            />
          }
        />
      ))}
    </div>
  );
};
