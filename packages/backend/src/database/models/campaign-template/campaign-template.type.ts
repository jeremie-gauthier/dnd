import { z } from 'zod';
import { campaignTemplateSchema } from './campaign-template.schema';

export type CampaignTemplate = z.infer<typeof campaignTemplateSchema>;
