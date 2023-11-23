import { z } from 'zod';
import { nonInteractiveEntitySchema } from '../schema/non-interactive.schema';

export type NonInteractiveEntity = z.infer<typeof nonInteractiveEntitySchema>;
