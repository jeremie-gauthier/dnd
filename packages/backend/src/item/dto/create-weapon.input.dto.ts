import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { itemBaseSchema } from '../schema/item-base.schema';

const weaponSchema = itemBaseSchema.merge(z.object({ type: z.literal('weapon') })).strict();

export class CreateWeaponInputDTO extends createZodDto(weaponSchema) {}
