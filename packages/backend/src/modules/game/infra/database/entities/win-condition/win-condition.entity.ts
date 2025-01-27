import { ApiProperty } from "@nestjs/swagger";
import {
  WinConditionName,
  WinConditionNameType,
} from "../../enums/win-condition-name.enum";

export abstract class WinCondition {
  @ApiProperty({ enum: WinConditionName, enumName: "WinConditionName" })
  abstract name: WinConditionNameType;
}
