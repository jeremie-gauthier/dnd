import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { RedisModule } from "src/redis/redis.module";
import { NewUserRegisteredListener } from "./events/listeners/new-user-registered/new-user-registered.listener";
import { NewUserRegisteredRepository } from "./events/listeners/new-user-registered/new-user-registered.repository";
import { TrackUserAccrossLobbiesListener } from "./events/listeners/track-user-accross-lobbies/track-user-accross-lobbies.listener";
import { TrackUserAccrossLobbiesRepository } from "./events/listeners/track-user-accross-lobbies/track-user-accross-lobbies.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User]), RedisModule],
  providers: [
    NewUserRegisteredListener,
    NewUserRegisteredRepository,
    TrackUserAccrossLobbiesListener,
    TrackUserAccrossLobbiesRepository,
  ],
})
export class UserModule {}
