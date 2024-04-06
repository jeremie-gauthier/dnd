import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthzModule } from "src/authz/authz.module";
import { User } from "src/database/entities/user.entity";
import { AuthPrivateController } from "./auth-private.controller";
import { PrivateUserConnectionRepository } from "./private-user-connection/private-user-connection.repository";
import { PrivateUserConnectionUseCase } from "./private-user-connection/private-user-connection.uc";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthzModule],
  controllers: [AuthPrivateController],
  providers: [PrivateUserConnectionUseCase, PrivateUserConnectionRepository],
})
export class AuthModule {}
