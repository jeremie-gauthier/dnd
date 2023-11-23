import { z } from 'zod';
import { campaignSchema } from '../schema/campaign.schema';

export type Campaign = z.infer<typeof campaignSchema>;
