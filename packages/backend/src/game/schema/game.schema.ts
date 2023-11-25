import { mapSchema } from 'src/map/schema/map.schema';
import { z } from 'zod';

export const gameSchema = z.object({
  currentEntityTurn: z.object({
    entityId: z.string().readonly(),
    actionPoints: z.number().nonnegative(),
  }),
  timeline: z.array(z.string().readonly()).readonly(),
  map: mapSchema.readonly(),
});
