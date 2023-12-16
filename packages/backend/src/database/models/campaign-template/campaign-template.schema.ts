import { z } from 'zod';
import { mapTemplateSchema } from '../map-template/map-template.schema';

export const stageSchema = z.object({
  title: z.string().readonly(),
  intro: z.string().readonly(),
  outro: z.string().readonly(),
  map: mapTemplateSchema,
});

export const campaignTemplateSchema = z.object({
  title: z.string().readonly(),
  stages: z.array(stageSchema.readonly()).readonly(),
});
