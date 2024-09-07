import { z } from "zod";
import { gameItemSchema } from "../../database";

export const playableEntityOpenChestOutputSchema = z.object({
  itemFound: gameItemSchema,
});

export type PlayableEntityOpenChestOutput = z.infer<
  typeof playableEntityOpenChestOutputSchema
>;
