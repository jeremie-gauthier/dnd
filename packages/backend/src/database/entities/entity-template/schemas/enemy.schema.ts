import z from 'zod';
import { playableSchema } from './playable.schema';

export const enemySchema = playableSchema.merge(
  z.object({
    type: z.literal('enemy'),
  }),
);
