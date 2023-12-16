import z from 'zod';
import { characterSchema } from '../entity-template/schemas/character.schema';
import { enemySchema } from '../entity-template/schemas/enemy.schema';
import { interactiveEntitySchema } from '../entity-template/schemas/interactive.schema';
import { nonInteractiveEntitySchema } from '../entity-template/schemas/non-interactive.schema';

export const mapTemplateSchema = z.object({
  height: z.number().positive().readonly(),
  width: z.number().positive().readonly(),
  tiles: z.array(
    z.object({
      label: z.string().optional(),
      entities: z
        .array(
          z.union([
            characterSchema,
            enemySchema,
            interactiveEntitySchema,
            nonInteractiveEntitySchema,
          ]),
        )
        .readonly(),
      coord: z
        .object({
          x: z.number().positive().readonly(),
          y: z.number().positive().readonly(),
        })
        .readonly(),
    }),
  ),
});
