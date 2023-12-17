import { z } from 'zod';
import { playableSchema } from '../schemas/playable.schema';

export type NonPlayableEntity = z.infer<typeof playableSchema>;
