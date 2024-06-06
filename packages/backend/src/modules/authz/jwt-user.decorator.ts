import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

export const JWTUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
