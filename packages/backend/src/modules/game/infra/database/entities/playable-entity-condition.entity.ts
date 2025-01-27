import { ApiProperty } from "@nestjs/swagger";
import { ConditionName, ConditionNameType } from "../enums/condition-name.enum";

export class PlayableEntityCondition {
  @ApiProperty({ enum: ConditionName, enumName: "ConditionName" })
  name: ConditionNameType;
  remainingTurns: number;
}
