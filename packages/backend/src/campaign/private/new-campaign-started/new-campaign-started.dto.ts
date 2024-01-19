import { newCampaignStartedInputSchema, newCampaignStartedOutputSchema } from '@dnd/shared';
import { createZodDto } from 'nestjs-zod';

export class NewCampaignStartedInputDto extends createZodDto(newCampaignStartedInputSchema) {}

export class NewCampaignStartedOutputDto extends createZodDto(newCampaignStartedOutputSchema) {}
