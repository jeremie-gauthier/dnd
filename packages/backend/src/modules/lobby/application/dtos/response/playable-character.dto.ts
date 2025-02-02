import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  PlayableCharacterType,
  PlayableCharacterTypeType,
} from "src/modules/lobby/infra/database/enums/playable-character-type.enum";

export class PlayableCharacterResponseDto {
  @Expose()
  readonly id: string;

  @Expose()
  @ApiProperty({
    enum: PlayableCharacterType,
    enumName: "PlayableCharacterType",
  })
  readonly type: PlayableCharacterTypeType;

  @Expose()
  readonly pickedBy?: string;
}
