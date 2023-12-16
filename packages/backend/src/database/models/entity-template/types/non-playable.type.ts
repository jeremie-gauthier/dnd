import { z } from 'zod';
import { nonPlayableEntitySchema } from '../schemas/non-playable.schema';

export type NonPlayableEntity = z.infer<typeof nonPlayableEntitySchema>;
