import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { PlayableEntityFaction } from "src/modules/game/infra/database/enums/playable-entity-faction.enum";
import { PlayableEntityResponseDto } from "./playable-entity.dto";

export class MonsterEntityResponseDto extends PlayableEntityResponseDto {
  @Expose()
  @ApiProperty({
    enum: [PlayableEntityFaction.MONSTER],
    enumName: "PlayableEntityFaction_Monster",
  })
  override readonly faction = PlayableEntityFaction.MONSTER;
}
