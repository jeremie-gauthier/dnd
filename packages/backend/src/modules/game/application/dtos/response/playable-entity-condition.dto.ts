import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  ConditionName,
  ConditionNameType,
} from "src/modules/game/infra/database/enums/condition-name.enum";

export class PlayableEntityConditionResponseDto {
  @Expose()
  @ApiProperty({ enum: ConditionName, enumName: "ConditionName" })
  readonly name: ConditionNameType;

  @Expose()
  readonly remainingTurns: number;
}
