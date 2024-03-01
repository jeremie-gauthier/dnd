import {
  CanActivate,
  ContextType,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "./jwt.service";

@Injectable()
export class JWTAuthGuard implements CanActivate {
  private static readonly getTokenByContextType: Readonly<
    Record<ContextType, (req: any) => string | undefined>
  > = {
    http: JWTAuthGuard.extractTokenFromHeader,
    ws: JWTAuthGuard.extractTokenFromHandshake,
    rpc: () => undefined,
  };

  private static readonly getRequestByType: Readonly<
    Record<ContextType, (context: ExecutionContext) => any>
  > = {
    http: (context) => context.switchToHttp().getRequest(),
    ws: (context) => context.switchToWs().getClient(),
    rpc: () => undefined,
  };

  private static readonly getPayloadToBindUserByType: Readonly<
    Record<ContextType, (context: ExecutionContext) => any>
  > = {
    http: (context) => context.switchToHttp().getRequest(),
    ws: (context) => context.switchToWs().getData(),
    rpc: () => undefined,
  };

  constructor(private readonly jwtService: JwtService) {}

  public async canActivate(context: ExecutionContext) {
    const type = context.getType();

    const request = JWTAuthGuard.getRequestByType[type](context);
    const token = JWTAuthGuard.getTokenByContextType[type](request);

    if (!token) {
      throw new UnauthorizedException("No token found");
    }

    const { sub } = await this.jwtService.verify(token);
    if (!sub) {
      throw new UnauthorizedException("No userId (sub) found in token");
    }

    const payload = JWTAuthGuard.getPayloadToBindUserByType[type](context);
    if (payload) {
      const user = { id: sub };
      payload.user = user;
    }

    return true;
  }

  private static extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

  private static extractTokenFromHandshake(client: any): string | undefined {
    return client.handshake.auth.token;
  }
}
