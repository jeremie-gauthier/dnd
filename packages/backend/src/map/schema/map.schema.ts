import { interactiveEntitySchema } from 'src/entity/non-playable/interactive/schema/interactive.schema';
import { nonInteractiveEntitySchema } from 'src/entity/non-playable/non-interactive/schema/non-interactive.schema';
import { characterSchema } from 'src/entity/playable/character/schema/character.schema';
import { enemySchema } from 'src/entity/playable/enemy/schema/enemy.schema';
import z from 'zod';

export const mapSchema = z.object({
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
