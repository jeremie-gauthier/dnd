import { createZodDto } from 'nestjs-zod';
import { interactiveEntitySchema } from '../non-playable/interactive/schema/interactive.schema';

export class CreateInteractiveEntityInputDTO extends createZodDto(
  interactiveEntitySchema.strict(),
) {}
