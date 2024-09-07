import { z } from "zod";

export const playableEntityOpenChestInputSchema = z.object({
  gameId: z.string().uuid(),
  coordOfTileWithChest: z.object({
    row: z.number().min(0),
    column: z.number().min(0),
  }),
});

export type PlayableEntityOpenChestInput = z.infer<
  typeof playableEntityOpenChestInputSchema
>;
