import { z } from 'zod';
import { nonPlayableEntitySchema } from '../../schema/non-playable.schema';

export const interactiveEntitySchema = nonPlayableEntitySchema.merge(
  z.object({
    type: z.literal('interactive').readonly(),
    isVisible: z.boolean(),
    canInteract: z.boolean(),
  }),
);
