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
          // Если ID совпадает с пришедшим событием
          if (localAnomaly.id === updatedAnomaly.id) {
            // 🔥 ЗАЩИТА: Если локально он уже CAPTURED, игнорируем обновление с сервера
            // Это предотвращает "сброс" статуса во время полета запроса
            if (localAnomaly.status === "CAPTURED") {
              return localAnomaly;
            }

            // Иначе обновляем (меняем уровень угрозы)
            return updatedAnomaly;
          }
          return localAnomaly;
        });
      });
    };

    return () => eventSource.close();
  }, [queryClient]);

  // 1. Fetching
  const { data: anomalies, isLoading } = useQuery({
    queryKey: ["anomalies"],
    queryFn: async () => {
      const res = await fetch("/api/anomalies");
      const data = await res.json();
      return ListSchema.parse(data); // Валидация входящих данных
    },
  });

  // 2. SSE Subscription (Real-time update)
  useEffect(() => {
    const eventSource = new EventSource("/api/stream");

    eventSource.onmessage = (event) => {
      const updatedAnomaly: Anomaly = JSON.parse(event.data);

      // Обновляем кэш без перезапроса всего списка
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
          // Внедряем фичу в слот сущности
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
