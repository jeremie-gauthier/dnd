import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const stageSchema = z.object({
  intro: z.string(),
  outro: z.string(),
});
const createCampaignInputSchema = z.object({
  title: z.string(),
  stages: z.array(stageSchema),
});

export class CreateCampaignInputDTO extends createZodDto(createCampaignInputSchema) {}
