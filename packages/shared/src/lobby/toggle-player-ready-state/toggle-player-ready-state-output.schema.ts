import { z } from "zod";

export const togglePlayerReadyStateOutputSchema = z.object({});

export type TogglePlayerReadyStateOutput = z.infer<
  typeof togglePlayerReadyStateOutputSchema
>;
