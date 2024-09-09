import { z } from "zod";

export const baseItemSchema = z.object({
  type: z.enum(["Weapon", "Spell"]),
  name: z.string(),
  level: z.number(),
  imgUrl: z.string(),
});

export type BaseItem = z.infer<typeof baseItemSchema>;
