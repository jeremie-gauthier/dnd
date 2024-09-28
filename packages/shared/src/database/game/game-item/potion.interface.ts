import { z } from "zod";
import { baseItemSchema } from "./base-item.interface";

export const potionSchema = baseItemSchema.merge(
  z.object({
    type: z.literal("Potion"),
  }),
);
export type PotionItem = z.infer<typeof potionSchema>;
