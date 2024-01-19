import { z } from 'zod';

// eslint-disable-next-line unicorn/no-keyword-prefix
export const newCampaignStartedInputSchema = z
  .object({
    campaignId: z.string().readonly(),
  })
  .strict();
