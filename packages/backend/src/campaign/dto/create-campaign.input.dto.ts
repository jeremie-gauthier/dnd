import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const stageSchema = z
  .object({
    intro: z.string(),
    outro: z.string(),
  })
  .strict();

const createCampaignInputSchema = z
  .object({
    title: z.string(),
    stages: z.array(stageSchema),
  })
  .strict();

export class CreateCampaignInputDTO extends createZodDto(createCampaignInputSchema) {}
