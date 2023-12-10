import { characterSchema } from 'src/entity/playable/character/schema/character.schema';
import z from 'zod';

const userCampaignStage = z.object({
  id: z.string().readonly(),
  status: z.enum(['COMING_SOON', 'LOCKED', 'OPENED']),
});

const userCampaign = z.object({
  id: z.string().readonly(),
  status: z.enum(['COMING_SOON', 'LOCKED', 'OPENED', 'STARTED']),
  stages: z.array(userCampaignStage).readonly(),
  characters: z.array(characterSchema).max(4),
  // array of item_template's id
  cardsDeck: z.array(z.string().readonly()).readonly(),
});

export const userSchema = z.object({
  id: z.string().readonly(),
  campaigns: z.array(userCampaign).readonly(),
});
