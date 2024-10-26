import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class Auth0WebhookGuard implements CanActivate {
  private readonly auth0WebhookToken: string;

  constructor(configService: ConfigService) {
    this.auth0WebhookToken = configService.getOrThrow("AUTH0_CUSTOM_SECRET");
  }

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const requestToken = request.headers.authorization;
    if (!requestToken) {
      throw new UnauthorizedException("No auth0 webhook token found");
    }

    if (requestToken !== this.auth0WebhookToken) {
      throw new UnauthorizedException("Invalid auth0 webhook token received");
    }

    return true;
  }
}
