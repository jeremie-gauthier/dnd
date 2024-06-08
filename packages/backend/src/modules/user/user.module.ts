import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { AuthzModule } from "src/modules/authz/authz.module";
import { UserPrivateController } from "./infra/controller/user.private-controller";
import { GetUserRepository } from "./use-cases/get-user/get-user.repository";
import { GetUserUseCase } from "./use-cases/get-user/get-user.uc";
import { UserConnectionRepository } from "./use-cases/user-connection/user-connection.repository";
import { UserConnectionUseCase } from "./use-cases/user-connection/user-connection.uc";

@Module({
  imports: [AuthzModule, TypeOrmModule.forFeature([User])],
  controllers: [UserPrivateController],
  providers: [
    UserConnectionUseCase,
    UserConnectionRepository,
    GetUserRepository,
    GetUserUseCase,
  ],
})
export class UserModule {}
