import { z } from "zod";

export const togglePlayerReadyStateInputSchema = z.object({
  lobbyId: z.string().uuid(),
});
