import { fetcher } from '../../config/fetcher';

export const fetchIdentityFn = (token: string) =>
  fetcher('http://localhost:3000/auth/private', token);
