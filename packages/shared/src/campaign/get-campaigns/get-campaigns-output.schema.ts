import { z } from "zod";

const stageSchema = z.object({
  id: z.string(),
  order: z.number().positive(),
  status: z.enum(["AVAILABLE", "COMING_SOON", "DISABLED"]),
});

export const getCampaignsOutputSchema = z.array(
  z.object({
    id: z.string(),
    status: z.enum(["AVAILABLE", "COMING_SOON", "DISABLED"]),
    currentStage: stageSchema,
    nbStages: z.number().positive(),
  }),
);

export type GetCampaignsOutput = z.infer<typeof getCampaignsOutputSchema>;
