import { type ExecutionContext, createParamDecorator } from "@nestjs/common";
import type { Request } from "express";

export const AuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
