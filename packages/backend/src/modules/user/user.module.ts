import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { AuthzModule } from "src/modules/authz/authz.module";
import { RedisModule } from "src/redis/redis.module";
import { GetUserRepository } from "./get-user/get-user.repository";
import { GetUserUseCase } from "./get-user/get-user.uc";
import { NewUserRegisteredRepository } from "./new-user-registered/new-user-registered.repository";
import { NewUserRegisteredUseCase } from "./new-user-registered/new-user-registered.uc";
import { TrackUserAccrossLobbiesRepository } from "./track-user-accross-lobbies/track-user-accross-lobbies.repository";
import { TrackUserAccrossLobbiesUseCase } from "./track-user-accross-lobbies/track-user-accross-lobbies.uc";
import { UserListeners } from "./user.listeners";
import { UserPrivateController } from "./user.private-controller";

@Module({
  imports: [AuthzModule, TypeOrmModule.forFeature([User]), RedisModule],
  controllers: [UserPrivateController],
  providers: [
    UserListeners,
    NewUserRegisteredUseCase,
    NewUserRegisteredRepository,
    TrackUserAccrossLobbiesUseCase,
    TrackUserAccrossLobbiesRepository,
    GetUserRepository,
    GetUserUseCase,
  ],
})
export class UserModule {}
