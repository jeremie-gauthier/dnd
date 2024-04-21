import { z } from "zod";

export const playableEntityMoveOutputSchema = z.object({});

export type PlayableEntityMoveOutput = z.infer<
  typeof playableEntityMoveOutputSchema
>;
