import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { GetUserOutputDto } from "../../use-cases/get-user/get-user.dto";
import { GetUserUseCase } from "../../use-cases/get-user/get-user.uc";

@UseGuards(AuthGuard)
@Controller("user/private")
export class UserPrivateController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  @Get("get-user/:userId")
  public async getUser(
    @Param("userId") userId: User["id"],
  ): Promise<GetUserOutputDto> {
    return await this.getUserUseCase.execute({ userId });
  }
}
