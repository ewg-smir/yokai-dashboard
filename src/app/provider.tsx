"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Создаем queryClient внутри useState, чтобы он создавался один раз
  // и сохранялся между ре-рендерами компонента.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Данные считаются свежими 1 минуту (чтобы не спамить запросами лишний раз)
            staleTime: 60 * 1000,
            // Отключаем повторный запрос при фокусе окна (опционально)
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
