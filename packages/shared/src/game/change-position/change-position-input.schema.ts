import { z } from "zod";

export const changePositionInputSchema = z.object({
  gameId: z.string().uuid(),
  heroId: z.string().uuid(),
  requestedPosition: z.object({
    row: z.number().min(0),
    column: z.number().min(0),
  }),
});

export type ChangePositionInput = z.infer<typeof changePositionInputSchema>;
