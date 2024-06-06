import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { User } from "src/database/entities/user.entity";
import { JWTAuthGuard } from "src/modules/authz/jwt-auth.guard";
import { GetUserOutputDto } from "./get-user/get-user.dto";
import { GetUserUseCase } from "./get-user/get-user.uc";

@UseGuards(JWTAuthGuard)
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
