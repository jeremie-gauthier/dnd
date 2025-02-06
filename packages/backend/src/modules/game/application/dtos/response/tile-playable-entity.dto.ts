import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  PlayableEntityFaction,
  PlayableEntityFactionType,
} from "src/modules/game/infra/database/enums/playable-entity-faction.enum";
import { TileEntityType } from "src/modules/game/infra/database/enums/tile-entity-type.enum";
import { TileEntityResponseDto } from "./tile-entity.dto";

export class TilePlayableEntityResponseDto extends TileEntityResponseDto {
  @Expose()
  @ApiProperty({
    enum: [TileEntityType.PLAYABLE_ENTITY],
    enumName: "TileEntityType_PlayableEntity",
  })
  override readonly type = TileEntityType.PLAYABLE_ENTITY;

  @Expose()
  readonly id: string;

  @Expose()
  @ApiProperty({
    enum: PlayableEntityFaction,
    enumName: "PlayableEntityFaction",
  })
  readonly faction: PlayableEntityFactionType;

  @Expose()
  readonly isBlocking: boolean;
}
