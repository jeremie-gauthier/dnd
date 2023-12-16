import { z } from 'zod';
import { enemySchema } from '../schemas/enemy.schema';

export type EnemyEntity = z.infer<typeof enemySchema>;
