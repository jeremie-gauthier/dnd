import { z } from 'zod';
import { gameSchema } from './game.schema';

export type Game = z.infer<typeof gameSchema>;
