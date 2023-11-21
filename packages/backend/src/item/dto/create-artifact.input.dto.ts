import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { itemBaseSchema } from '../schema/item-base.schema';

const artifactSchema = itemBaseSchema.merge(z.object({ type: z.literal('artifact') })).strict();

export class CreateArtifactInputDTO extends createZodDto(artifactSchema) {}
