import { z } from 'zod';

// eslint-disable-next-line unicorn/no-keyword-prefix
export const newCampaignStartedOutputSchema = z
  .object({
    id: z.string().readonly(),
  })
  .transform(({ id }) => ({
    campaignProgressionId: id,
  }));
