import { z } from 'zod';
import { userSchema } from '../schema/user.schema';

export type User = z.infer<typeof userSchema>;

export type CreateUser = Omit<User, 'id'>;
