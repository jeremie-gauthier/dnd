import { createZodDto } from 'nestjs-zod';
import { characterSchema } from '../playable/character/schema/character.schema';

export class CreateCharacterEntityInputDTO extends createZodDto(characterSchema.strict()) {}
