import { z } from 'zod';
import { mapTemplateSchema } from '../map-template/map-template.schema';

export const gameSchema = z.object({
  currentEntityTurn: z.object({
    entityId: z.string().readonly(),
    actionPoints: z.number().nonnegative(),
  }),
  timeline: z.array(z.string().readonly()).readonly(),
  map: mapTemplateSchema.readonly(),
});
