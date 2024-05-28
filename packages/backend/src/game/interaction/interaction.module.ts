import { Module } from "@nestjs/common";
import { AuthzModule } from "src/authz/authz.module";
import { RedisModule } from "src/redis/redis.module";
import { BackupModule } from "../backup/backup.module";
import { CombatModule } from "../combat/combat.module";
import { TimelineModule } from "../timeline/timeline.module";
import { InteractionSubscriberGateway } from "./interaction.subscriber-gateway";
import { OpenDoorRepository } from "./open-door/open-door.repository";
import { OpenDoorUseCase } from "./open-door/open-door.uc";

@Module({
  imports: [
    AuthzModule,
    TimelineModule,
    RedisModule,
    CombatModule,
    BackupModule,
  ],
  providers: [
    OpenDoorUseCase,
    OpenDoorRepository,
    InteractionSubscriberGateway,
  ],
})
export class InteractionModule {}
