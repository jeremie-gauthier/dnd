import { z } from 'zod';
import { enemySchema } from '../schema/enemy.schema';

export type EnemyEntity = z.infer<typeof enemySchema>;
