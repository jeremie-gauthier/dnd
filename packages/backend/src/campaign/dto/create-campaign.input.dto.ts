import { createZodDto } from 'nestjs-zod';
import { campaignSchema } from '../schema/campaign.schema';

export class CreateCampaignInputDTO extends createZodDto(campaignSchema.strict()) {}
