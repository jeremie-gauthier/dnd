import z from 'zod';
import { playableSchema } from '../../schema/playable.schema';

export const characterSchema = playableSchema.merge(
  z.object({
    type: z.literal('character'),
    class: z.enum(['warrior', 'cleric', 'sorcerer', 'thief']).readonly(),
    level: z.number().min(1).max(3),
  }),
);
