import { z } from "zod";
import { attackPerkSchema } from "./attack-perk.interface";
import { baseItemSchema } from "./base-item.interface";
import { diceSchema } from "./dice.interface";

export const attackItemSchema = baseItemSchema.merge(
  z.object({
    attacks: z
      .array(
        z.object({
          id: z.string(),
          range: z.enum(["melee", "long", "versatile"]),
          type: z.enum(["regular", "super"]),
          dices: z.array(diceSchema),
          perks: z.array(attackPerkSchema),
        }),
      )
      .min(1),
  }),
);
export type AttackItem = z.infer<typeof attackItemSchema>;

export const weaponSchema = attackItemSchema.merge(
  z.object({
    type: z.literal("Weapon"),
  }),
);
export type WeaponItem = z.infer<typeof weaponSchema>;

export const spellSchema = attackItemSchema.merge(
  z.object({
    type: z.literal("Spell"),
    manaCost: z.record(
      z.enum(["WARRIOR", "CLERIC", "SORCERER", "THIEF"]),
      z.number(),
    ),
  }),
);
export type SpellItem = z.infer<typeof spellSchema>;
