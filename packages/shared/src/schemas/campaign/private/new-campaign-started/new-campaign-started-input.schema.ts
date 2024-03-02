import { z } from "zod";

export const newCampaignStartedInputSchema = z
  .object({
    campaignId: z.string().readonly(),
  })
  .strict();
