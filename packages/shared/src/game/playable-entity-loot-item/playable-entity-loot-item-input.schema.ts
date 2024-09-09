import { z } from "zod";

export const playableEntityLootItemInputSchema = z.object({
  gameId: z.string().uuid(),
  itemId: z.string(),
  replacedItemId: z.string().optional(),
  storageSpace: z.enum(["gear", "backpack"]),
});

export type PlayableEntityLootItemInput = z.infer<
  typeof playableEntityLootItemInputSchema
>;
