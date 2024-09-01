import { z } from "zod";

export const playableEntitySwapItemsInputSchema = z
  .object({
    gameId: z.string().uuid(),
    gearItemId: z.string().optional(),
    backpackItemId: z.string().optional(),
  })
  .refine(
    (schema) =>
      (schema.backpackItemId && !schema.gearItemId) ||
      (!schema.backpackItemId && schema.gearItemId),
    "At least one itemId is required",
  );

export type PlayableEntitySwapItemsInput = z.infer<
  typeof playableEntitySwapItemsInputSchema
>;
