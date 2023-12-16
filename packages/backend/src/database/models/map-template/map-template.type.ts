import { z } from 'zod';
import { mapTemplateSchema } from './map-template.schema';

export type MapTemplate = z.infer<typeof mapTemplateSchema>;
