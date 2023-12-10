import { z } from 'zod';
import { mapSchema } from '../schema/map.schema';

export type Map = z.infer<typeof mapSchema>;
