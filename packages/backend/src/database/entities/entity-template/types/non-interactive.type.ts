import { z } from 'zod';
import { nonInteractiveEntitySchema } from '../schemas/non-interactive.schema';

export type NonInteractiveEntity = z.infer<typeof nonInteractiveEntitySchema>;
