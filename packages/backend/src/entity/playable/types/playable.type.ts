import { z } from 'zod';
import { playableSchema } from '../schema/playable.schema';

export type NonPlayableEntity = z.infer<typeof playableSchema>;
