import { z } from "zod";

const coordSchema = z.object({
  row: z.number().min(0),
  column: z.number().min(0),
});

export const playableEntityMoveInputSchema = z.object({
  gameId: z.string().uuid(),
  pathToTile: z.array(coordSchema),
});

export type PlayableEntityMoveInput = z.infer<
  typeof playableEntityMoveInputSchema
>;
