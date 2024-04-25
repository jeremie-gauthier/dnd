import { Module } from "@nestjs/common";
import { RedisModule } from "src/redis/redis.module";
import { TimelineModule } from "../timeline/timeline.module";
import { InteractionPrivateGateway } from "./interaction.private-gateway";
import { OpenDoorRepository } from "./open-door/open-door.repository";
import { OpenDoorUseCase } from "./open-door/open-door.uc";

@Module({
  imports: [TimelineModule, RedisModule],
  providers: [InteractionPrivateGateway, OpenDoorUseCase, OpenDoorRepository],
})
export class InteractionModule {}
