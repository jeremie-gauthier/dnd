import { z } from "zod";

export const newCampaignStartedOutputSchema = z
  .object({
    id: z.string().readonly(),
  })
  .transform(({ id }) => ({
    campaignProgressionId: id,
  }));
