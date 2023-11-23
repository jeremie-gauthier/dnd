import { z } from 'zod';

export const stageSchema = z.object({
  intro: z.string(),
  outro: z.string(),
});

export const campaignSchema = z.object({
  title: z.string(),
  stages: z.array(stageSchema),
});
