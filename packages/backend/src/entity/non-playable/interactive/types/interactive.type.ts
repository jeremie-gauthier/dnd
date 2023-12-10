import { z } from 'zod';
import { interactiveEntitySchema } from '../schema/interactive.schema';

export type InteractiveEntity = z.infer<typeof interactiveEntitySchema>;
