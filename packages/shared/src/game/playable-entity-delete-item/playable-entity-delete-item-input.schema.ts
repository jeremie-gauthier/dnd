import { z } from "zod";

export const playableEntityDeleteItemInputSchema = z.object({
  gameId: z.string().uuid(),
  itemId: z.string(),
});

export type PlayableEntityDeleteItemInput = z.infer<
  typeof playableEntityDeleteItemInputSchema
>;
