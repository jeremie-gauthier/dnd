import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import type { Request } from "express";
import { ZodSerializerDto } from "nestjs-zod";
import { JWTAuthGuard } from "src/modules/authz/jwt-auth.guard";
import { JWTUser } from "src/modules/authz/jwt-user.decorator";
import { GetUserOutputDto } from "src/modules/user/get-user/get-user.dto";
import { UserConnectionInputDto } from "./user-connection/user-connection.dto";
import { UserConnectionUseCase } from "./user-connection/user-connection.uc";

@UseGuards(JWTAuthGuard)
@Controller("auth/private")
export class AuthPrivateController {
  constructor(private readonly userConnectionUseCase: UserConnectionUseCase) {}

  @Post("connection")
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(GetUserOutputDto)
  public async connection(
    @JWTUser() user: Request["user"],
    @Body() userConnectionDto: UserConnectionInputDto,
  ) {
    return await this.userConnectionUseCase.execute({
      userId: user.id,
      ...userConnectionDto,
    });
  }
}
