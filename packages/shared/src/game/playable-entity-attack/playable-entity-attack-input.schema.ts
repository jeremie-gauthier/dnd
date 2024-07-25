import { z } from "zod";

export const playableEntityAttackInputSchema = z.object({
  gameId: z.string().uuid(),
  attackId: z.string().uuid(),
  targetPlayableEntityId: z.string(),
});

export type PlayableEntityAttackInput = z.infer<
  typeof playableEntityAttackInputSchema
>;
