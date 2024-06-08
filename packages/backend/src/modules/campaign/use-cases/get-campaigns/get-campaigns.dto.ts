import { getCampaignsOutputSchema } from "@dnd/shared";
import { createZodDto } from "nestjs-zod";

export class NewCampaignStartedOutputDto extends createZodDto(
  getCampaignsOutputSchema,
) {}
