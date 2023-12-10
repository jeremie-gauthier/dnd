import { createZodDto } from 'nestjs-zod';
import { nonInteractiveEntitySchema } from '../non-playable/non-interactive/schema/non-interactive.schema';

export class CreateNonInteractiveEntityInputDTO extends createZodDto(
  nonInteractiveEntitySchema.strict(),
) {}
