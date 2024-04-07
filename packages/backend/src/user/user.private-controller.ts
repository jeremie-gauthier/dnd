import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "src/authz/jwt-auth.guard";
import { User } from "src/database/entities/user.entity";
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
