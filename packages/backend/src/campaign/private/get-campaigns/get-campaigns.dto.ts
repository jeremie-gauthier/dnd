import { createZodDto } from 'nestjs-zod';
import { CampaignStageStatus } from 'src/database/entities/campaign-stage.entity';
import { CampaignStatus } from 'src/database/entities/campaign.entity';
import { z } from 'zod';

const stageSchema = z.object({
  id: z.string(),
  order: z.number().positive(),
  title: z.string(),
  status: z.nativeEnum(CampaignStageStatus),
});

const getCampaignsOutputSchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    status: z.nativeEnum(CampaignStatus),
    currentStage: stageSchema,
    nbStages: z.number().positive(),
  }),
);

export class NewCampaignStartedOutputDto extends createZodDto(getCampaignsOutputSchema) {}
