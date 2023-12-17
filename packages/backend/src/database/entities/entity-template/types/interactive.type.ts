import { z } from 'zod';
import { interactiveEntitySchema } from '../schemas/interactive.schema';

export type InteractiveEntity = z.infer<typeof interactiveEntitySchema>;
