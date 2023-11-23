import z from 'zod';
import { itemBaseSchema } from '../schema/item-base.schema';

export const artifactSchema = itemBaseSchema.merge(
  z.object({
    type: z.literal('artifact'),
  }),
);
