import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { AuthzModule } from "src/modules/authz/authz.module";
import { AuthPrivateController } from "./auth-private.controller";
import { UserConnectionRepository } from "./user-connection/user-connection.repository";
import { UserConnectionUseCase } from "./user-connection/user-connection.uc";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthzModule],
  controllers: [AuthPrivateController],
  providers: [UserConnectionUseCase, UserConnectionRepository],
})
export class AuthModule {}
