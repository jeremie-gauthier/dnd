import { mapSchema } from 'src/map/schema/map.schema';
import { z } from 'zod';

export const stageSchema = z.object({
  intro: z.string().readonly(),
  outro: z.string().readonly(),
  map: mapSchema,
});

export const campaignSchema = z.object({
  title: z.string().readonly(),
  stages: z.array(stageSchema.readonly()).readonly(),
});
