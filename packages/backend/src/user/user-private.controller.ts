import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "src/authz/jwt-auth.guard";
import { User } from "src/database/entities/user.entity";
import { PrivateGetUserOutputDto } from "./private-get-user/private-get-user.dto";
import { PrivateGetUserUseCase } from "./private-get-user/private-get-user.uc";

@UseGuards(JWTAuthGuard)
@Controller("user/private")
export class UserPrivateController {
  constructor(private readonly getUserUseCase: PrivateGetUserUseCase) {}

  @Get("get-user/:userId")
  public async getUser(
    @Param("userId") userId: User["id"],
  ): Promise<PrivateGetUserOutputDto> {
    return await this.getUserUseCase.execute({ userId });
  }
}
