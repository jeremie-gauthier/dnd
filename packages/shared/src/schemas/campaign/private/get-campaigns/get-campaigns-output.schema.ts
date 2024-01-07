import { z } from 'zod';

const stageSchema = z.object({
  id: z.string(),
  order: z.number().positive(),
  title: z.string(),
  status: z.enum(['AVAILABLE', 'COMING_SOON', 'DISABLED']),
});

export const getCampaignsOutputSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    status: z.enum(['AVAILABLE', 'COMING_SOON', 'DISABLED']),
    currentStage: stageSchema,
    nbStages: z.number().positive(),
  }),
);
