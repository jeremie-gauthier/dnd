import { z } from 'zod';
import { nonPlayableEntitySchema } from '../schema/non-playable.schema';

export type NonPlayableEntity = z.infer<typeof nonPlayableEntitySchema>;
