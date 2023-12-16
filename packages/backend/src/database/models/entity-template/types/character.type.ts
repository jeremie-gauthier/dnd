import { z } from 'zod';
import { characterSchema } from '../schemas/character.schema';

export type CharacterEntity = z.infer<typeof characterSchema>;
