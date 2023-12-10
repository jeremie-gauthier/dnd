import { z } from 'zod';
import { characterSchema } from '../schema/character.schema';

export type CharacterEntity = z.infer<typeof characterSchema>;
