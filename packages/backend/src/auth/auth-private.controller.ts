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
import { JWTAuthGuard } from "src/authz/jwt-auth.guard";
import { JWTUser } from "src/authz/jwt-user.decorator";
import { PrivateGetUserOutputDto } from "src/user/private-get-user/private-get-user.dto";
import { PrivateUserConnectionInputDto } from "./private-user-connection/private-user-connection.dto";
import { PrivateUserConnectionUseCase } from "./private-user-connection/private-user-connection.uc";

@UseGuards(JWTAuthGuard)
@Controller("auth/private")
export class AuthPrivateController {
  constructor(
    private readonly userConnectionUseCase: PrivateUserConnectionUseCase,
  ) {}

  @Post("connection")
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(PrivateGetUserOutputDto)
  public async connection(
    @JWTUser() user: Request["user"],
    @Body() userConnectionDto: PrivateUserConnectionInputDto,
  ) {
    return await this.userConnectionUseCase.execute({
      userId: user.id,
      ...userConnectionDto,
    });
  }
}
