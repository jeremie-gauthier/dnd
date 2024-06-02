import { z } from "zod";

export const newCampaignStartedOutputSchema = z
  .object({
    id: z.string().readonly(),
  })
  .transform(({ id }) => ({
    campaignProgressionId: id,
  }));

export type NewCampaignStartedOutput = z.infer<
  typeof newCampaignStartedOutputSchema
>;
