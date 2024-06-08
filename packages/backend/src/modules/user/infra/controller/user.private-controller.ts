import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { ZodSerializerDto } from "nestjs-zod";
import { User } from "src/database/entities/user.entity";
import { AuthUser } from "src/decorators/auth-user.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { GetUserOutputDto } from "../../use-cases/get-user/get-user.dto";
import { GetUserUseCase } from "../../use-cases/get-user/get-user.uc";
import { UserConnectionInputDto } from "../../use-cases/user-connection/user-connection.dto";
import { UserConnectionUseCase } from "../../use-cases/user-connection/user-connection.uc";

@UseGuards(AuthGuard)
@Controller("user/private")
export class UserPrivateController {
  constructor(
    private readonly userConnectionUseCase: UserConnectionUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Post("connection")
  @ZodSerializerDto(GetUserOutputDto)
  public async connection(
    @AuthUser() user: Request["user"],
    @Body() userConnectionDto: UserConnectionInputDto,
  ) {
    return await this.userConnectionUseCase.execute({
      userId: user.id,
      ...userConnectionDto,
    });
  }

  @Get("get-user/:userId")
  public async getUser(
    @Param("userId") userId: User["id"],
  ): Promise<GetUserOutputDto> {
    return await this.getUserUseCase.execute({ userId });
  }
}
