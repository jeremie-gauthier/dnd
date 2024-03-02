import { z } from "zod";

export const getCampaignsInputSchema = z.object({});

export type GetCampaignsInput = z.infer<typeof getCampaignsInputSchema>;
