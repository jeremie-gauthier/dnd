import { z } from "zod";

export const attackPerkSchema = z.object({
  name: z.string(),
  trigger: z.string(),
});

export type AttackPerk = z.infer<typeof attackPerkSchema>;
