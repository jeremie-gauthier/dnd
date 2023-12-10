import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const createCampaignOutputSchema = z.object({
  generated_keys: z.array(z.string()),
});

export class CreateCampaignOutputDTO extends createZodDto(createCampaignOutputSchema) {}
