import { z } from "zod";

export const AnomalySchema = z.object({
  id: z.string(),
  name: z.string(),
  threatLevel: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  location: z.string(),
  status: z.enum(["ACTIVE", "CAPTURED"]),
});

export type Anomaly = z.infer<typeof AnomalySchema>;
