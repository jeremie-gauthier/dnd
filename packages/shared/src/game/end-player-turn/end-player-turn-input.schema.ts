import { z } from "zod";

export const endPlayerTurnInputSchema = z.object({
  gameId: z.string().uuid(),
});

export type EndPlayerTurnInput = z.infer<typeof endPlayerTurnInputSchema>;
