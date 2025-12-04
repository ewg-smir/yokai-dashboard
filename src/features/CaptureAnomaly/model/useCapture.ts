import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Anomaly } from "@/entities/Anomaly";

type MutationArgs = {
  id: string;
  status: "ACTIVE" | "CAPTURED";
};

export const useCapture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: MutationArgs) => {
      const res = await fetch("/api/capture", {
        method: "POST",
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Operation failed");
      return res.json();
    },

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["anomalies"] });
      const previousData = queryClient.getQueryData<Anomaly[]>(["anomalies"]);

      queryClient.setQueryData<Anomaly[]>(["anomalies"], (old) =>
        old?.map((a) => (a.id === id ? { ...a, status: status } : a))
      );

      return { previousData };
    },

    onError: (err, variables, context) => {
      alert(`⚠️ System Malfunction: ${err.message}`);
      if (context?.previousData) {
        queryClient.setQueryData(["anomalies"], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["anomalies"] });
    },
  });
};
