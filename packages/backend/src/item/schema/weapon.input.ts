import z from 'zod';
import { itemBaseSchema } from '../schema/item-base.schema';

export const weaponSchema = itemBaseSchema.merge(
  z.object({
    type: z.literal('weapon'),
  }),
);
