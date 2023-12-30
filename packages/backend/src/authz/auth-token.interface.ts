import { JwtPayload } from 'jsonwebtoken';

export interface AuthToken extends JwtPayload {
  azp: string;
  scope: string;
}
