import z from 'zod';
import { itemBaseSchema } from './item-base.schema';

export const spellSchema = itemBaseSchema.merge(
  z.object({
    type: z.literal('spell'),
    manaCost: z.object({
      cleric: z.number().min(0),
      sorcerer: z.number().min(0),
    }),
  }),
);
