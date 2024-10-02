import { z } from "zod";

export const playableEntityDrinkPotionInputSchema = z.object({
  gameId: z.string().uuid(),
  itemId: z.string(),
});

export type PlayableEntityDrinkPotionInput = z.infer<
  typeof playableEntityDrinkPotionInputSchema
>;
