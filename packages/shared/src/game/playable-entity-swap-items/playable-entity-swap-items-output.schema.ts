import { z } from "zod";

export const playableEntitySwapItemsOutputSchema = z.object({});

export type PlayableEntitySwapItemsOutput = z.infer<
  typeof playableEntitySwapItemsOutputSchema
>;
