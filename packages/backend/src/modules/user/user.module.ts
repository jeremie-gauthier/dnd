import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { AuthzModule } from "src/modules/authz/authz.module";
import { RedisModule } from "src/redis/redis.module";
import { NewUserRegisteredListener } from "./events/listeners/new-user-registered/new-user-registered.listener";
import { NewUserRegisteredRepository } from "./events/listeners/new-user-registered/new-user-registered.repository";
import { TrackUserAccrossLobbiesListener } from "./events/listeners/track-user-accross-lobbies/track-user-accross-lobbies.listener";
import { TrackUserAccrossLobbiesRepository } from "./events/listeners/track-user-accross-lobbies/track-user-accross-lobbies.repository";
import { GetUserRepository } from "./get-user/get-user.repository";
import { GetUserUseCase } from "./get-user/get-user.uc";
import { UserPrivateController } from "./user.private-controller";

@Module({
  imports: [AuthzModule, TypeOrmModule.forFeature([User]), RedisModule],
  controllers: [UserPrivateController],
  providers: [
    NewUserRegisteredListener,
    NewUserRegisteredRepository,
    TrackUserAccrossLobbiesListener,
    TrackUserAccrossLobbiesRepository,
    GetUserRepository,
    GetUserUseCase,
  ],
})
export class UserModule {}
