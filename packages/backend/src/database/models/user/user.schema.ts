import { z } from 'zod';
import { campaignTemplateSchema, stageSchema } from '../campaign-template/campaign-template.schema';
import { characterSchema } from '../entity-template/schemas/character.schema';

const userCampaignStages = stageSchema.merge(
  z.object({
    status: z.enum(['LOCKED', 'OPENED', 'COMING_SOON']),
  }),
);

const userCampaign = campaignTemplateSchema.merge(
  z.object({
    status: z.enum(['LOCKED', 'OPENED', 'STARTED', 'COMING_SOON']),
    stages: userCampaignStages,
    characters: z.array(characterSchema),
  }),
);

export const userSchema = z.object({
  id: z.string().readonly(),
  campaigns: z.array(userCampaign),
});
