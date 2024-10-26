import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { UserPrivateController } from "./infra/controller/user.private-controller";
import { UserWebhookController } from "./infra/controller/user.webhook-controller";
import { GetUserRepository } from "./use-cases/get-user/get-user.repository";
import { GetUserUseCase } from "./use-cases/get-user/get-user.uc";
import { UserRegisteredRepository } from "./use-cases/user-registered/user-registered.repository";
import { UserRegisteredUseCase } from "./use-cases/user-registered/user-registered.uc";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserPrivateController, UserWebhookController],
  providers: [
    UserRegisteredUseCase,
    UserRegisteredRepository,
    GetUserRepository,
    GetUserUseCase,
  ],
})
export class UserModule {}
