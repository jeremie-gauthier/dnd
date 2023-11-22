import { createZodDto } from 'nestjs-zod';
import { enemySchema } from '../playable/enemy/schema/enemy.schema';

export class CreateEnemyEntityInputDTO extends createZodDto(enemySchema.strict()) {}
