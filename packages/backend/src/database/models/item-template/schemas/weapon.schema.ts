import z from 'zod';
import { itemBaseSchema } from './item-base.schema';

export const weaponSchema = itemBaseSchema.merge(
  z.object({
    type: z.literal('weapon'),
  }),
);
