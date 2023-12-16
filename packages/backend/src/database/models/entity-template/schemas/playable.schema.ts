import z from 'zod';
import { entityBaseSchema } from './entity-base.schema';

const bagSlot = z.number().positive().readonly();

export const inventorySchema = z.object({
  backpack: z.object({
    items: z.array(z.object({ type: z.enum(['weapon', 'artifact', 'spell']) })),
    slots: bagSlot,
  }),
  equipped: z.object({
    weapon: z.object({
      items: z.array(z.object({ type: z.literal('weapon') })),
      slots: bagSlot,
    }),
    artifact: z.object({
      items: z.array(z.object({ type: z.literal('artifact') })),
      slots: bagSlot,
    }),
    spell: z.object({
      items: z.array(z.object({ type: z.literal('spell') })),
      slots: bagSlot,
    }),
  }),
});

export const playableSchema = entityBaseSchema.merge(
  z.object({
    name: z.string(),
    type: z.enum(['character', 'enemy']),
    isPlayable: z.literal(true).default(true),
    initiative: z.number().default(0),
    speed: z.number().readonly(),
    healthPoints: z.number().nonnegative(),
    healthPointsNatural: z.number().positive().readonly(),
    manaPoints: z.number().nonnegative(),
    manaPointsNatural: z.number().positive().readonly(),
    armorClass: z.number().nonnegative(),
    armorClassNatural: z.number().positive().readonly(),
    inventory: inventorySchema,
  }),
);
