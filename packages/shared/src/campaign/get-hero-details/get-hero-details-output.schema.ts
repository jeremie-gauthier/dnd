import { z } from "zod";

export const getHeroDetailsOutputSchema = z.object({
  id: z.string().uuid(),
  class: z.enum(["WARRIOR", "CLERIC", "SORCERER", "THIEF"]),
  name: z.string(),
  imgUrl: z.string().url(),
  characteristic: z.object({
    baseHealthPoints: z.number().min(0),
    baseArmorClass: z.number().min(0),
    baseMovementPoints: z.number().min(0),
    baseManaPoints: z.number().min(0),
    baseActionPoints: z.number().min(0),
  }),
});

export type GetHeroDetailsOutput = z.infer<typeof getHeroDetailsOutputSchema>;
