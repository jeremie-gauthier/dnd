import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const newCampaignStartedInputSchema = z
  .object({
    campaignId: z.string().readonly(),
  })
  .strict();

export class NewCampaignStartedInputDto extends createZodDto(newCampaignStartedInputSchema) {}

const newCampaignStartedOutputSchema = z
  .object({
    id: z.string().readonly(),
  })
  .transform(({ id }) => ({
    campaignProgressionId: id,
  }));

export class NewCampaignStartedOutputDto extends createZodDto(newCampaignStartedOutputSchema) {}
