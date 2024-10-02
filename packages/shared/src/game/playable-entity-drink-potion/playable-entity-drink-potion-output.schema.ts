import { z } from "zod";

export const playableEntityDrinkPotionOutputSchema = z.object({});

export type PlayableEntityDrinkPotionOutput = z.infer<
  typeof playableEntityDrinkPotionOutputSchema
>;
