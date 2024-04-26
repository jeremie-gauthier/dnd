import { z } from 'zod';

export const pickGameMasterOutputSchema = z.object({});

export type PickGameMasterOutput = z.infer<typeof pickGameMasterOutputSchema>;