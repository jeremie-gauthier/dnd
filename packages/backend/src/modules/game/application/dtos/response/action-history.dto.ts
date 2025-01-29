import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import {
  ActionName,
  ActionNameType,
} from "src/modules/game/infra/database/enums/action-name.enum";

export class ActionHistoryResponseDto {
  @Expose()
  @ApiProperty({ enum: ActionName, enumName: "ActionName" })
  readonly name: ActionNameType;
}
