import { z } from "zod";

export const togglePlayerReadyStateInputSchema = z.object({
  lobbyId: z.string().uuid(),
});

export type TogglePlayerReadyStateInput = z.infer<
  typeof togglePlayerReadyStateInputSchema
>;
