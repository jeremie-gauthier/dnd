import { z } from "zod";

export const playableEntityLootItemOutputSchema = z.object({});

export type PlayableEntityLootItemOutput = z.infer<
  typeof playableEntityLootItemOutputSchema
>;
