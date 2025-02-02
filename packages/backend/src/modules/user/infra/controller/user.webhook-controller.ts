import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";
import { Auth0WebhookGuard } from "src/guards/auth0-webhook.guard";
import { UserRegisteredInputDto } from "../../use-cases/user-registered/user-registered.dto";
import { UserRegisteredUseCase } from "../../use-cases/user-registered/user-registered.uc";

@UseGuards(Auth0WebhookGuard)
@Controller("user/webhook")
@ApiExcludeController()
export class UserWebhookController {
  constructor(private readonly userRegisteredUseCase: UserRegisteredUseCase) {}

  @Post("registration")
  public async userRegistered(
    @Body() userRegisteredDto: UserRegisteredInputDto,
  ): Promise<void> {
    return await this.userRegisteredUseCase.execute(userRegisteredDto);
  }
}
