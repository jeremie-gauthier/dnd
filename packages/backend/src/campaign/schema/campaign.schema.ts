import z from 'zod';

export type StageSchema = z.infer<typeof stageSchema>;
export const stageSchema = z.object({
  intro: z.string(),
  outro: z.string(),
});

export type CampaignSchema = z.infer<typeof campaignSchema>;
export const campaignSchema = z.object({
  title: z.string(),
  stages: z.array(stageSchema),
});
