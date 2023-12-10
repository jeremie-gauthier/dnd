import { z } from 'zod';
import { gameSchema } from '../schema/game.schema';

export type Game = z.infer<typeof gameSchema>;
