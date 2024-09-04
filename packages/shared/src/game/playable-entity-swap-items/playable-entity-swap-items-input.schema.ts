import { z } from "zod";

export const playableEntitySwapItemsInputSchema = z.object({
  gameId: z.string().uuid(),
  gearItemId: z.string().optional(),
  backpackItemId: z.string().optional(),
});

export type PlayableEntitySwapItemsInput = z.infer<
  typeof playableEntitySwapItemsInputSchema
>;
