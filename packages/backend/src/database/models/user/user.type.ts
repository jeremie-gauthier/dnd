import { z } from 'zod';
import { userSchema } from './user.schema';

export type User = z.infer<typeof userSchema>;
