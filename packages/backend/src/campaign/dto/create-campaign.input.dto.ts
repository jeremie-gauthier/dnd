import { createZodDto } from 'nestjs-zod';
import { campaignTemplateSchema } from 'src/database/models/campaign-template/campaign-template.schema';

export class CreateCampaignInputDTO extends createZodDto(campaignTemplateSchema.strict()) {}
