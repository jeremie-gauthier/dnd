import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { Serialize } from "src/middlewares/serialize.interceptor";
import {
  GetUserInputParamsDto,
  GetUserOutputDto,
} from "../../use-cases/get-user/get-user.dto";
import { GetUserUseCase } from "../../use-cases/get-user/get-user.uc";

@UseGuards(AuthGuard)
@Controller("user/private")
@ApiTags("User")
export class UserPrivateController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  @Get("get-user/:userId")
  @Serialize(GetUserOutputDto)
  public async getUser(
    @Param() { userId }: GetUserInputParamsDto,
  ): Promise<GetUserOutputDto> {
    return await this.getUserUseCase.execute({ userId });
  }
}
