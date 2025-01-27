import { ApiProperty } from "@nestjs/swagger";
import { ActionName, ActionNameType } from "../enums/action-name.enum";

export class ActionHistory {
  @ApiProperty({ enum: ActionName, enumName: "ActionName" })
  readonly name: ActionNameType;
}
