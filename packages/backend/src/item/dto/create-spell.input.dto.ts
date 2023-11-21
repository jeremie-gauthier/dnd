import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { itemBaseSchema } from '../schema/item-base.schema';

const spellSchema = itemBaseSchema
  .merge(
    z.object({
      type: z.literal('spell'),
      manaCost: z.object({
        cleric: z.number().min(0),
        sorcerer: z.number().min(0),
      }),
    }),
  )
  .strict();

export class CreateSpellInputDTO extends createZodDto(spellSchema) {}
