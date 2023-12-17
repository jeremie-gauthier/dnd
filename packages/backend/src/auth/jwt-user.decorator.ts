import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const JWTUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();
  return { id: request.auth?.payload.sub ?? '' };
});

export type UserFromJWT = {
  id: string;
};
