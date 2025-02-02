import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { PerkName, PerkNameType } from "src/database/enums/perk-name.enum";
import {
  PerkTrigger,
  PerkTriggerType,
} from "src/database/enums/perk-trigger.enum";

export class PerkResponseDto {
  @Expose()
  @ApiProperty({ enum: PerkName, enumName: "PerkName" })
  readonly name: PerkNameType;

  @Expose()
  @ApiProperty({ enum: PerkTrigger, enumName: "PerkTrigger" })
  readonly trigger: PerkTriggerType;
}
