import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnemyTemplate } from "src/database/entities/enemy-template.entity";
import { PlayableEntityRepository } from "./services/playable-entity/playable-entity.repository";
import { PlayableEntityService } from "./services/playable-entity/playable-entity.service";

@Module({
  imports: [TypeOrmModule.forFeature([EnemyTemplate])],
  exports: [PlayableEntityService],
  providers: [PlayableEntityService, PlayableEntityRepository],
})
export class PlayableEntityModule {}
