import { PerkNameType, PerkTriggerType, PerkTriggerValues } from "@dnd/shared";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { PerkName } from "../enums/perk-name.enum";
import { PerkTrigger } from "../enums/perk-trigger.enum";

@Entity()
export class Perk {
  @PrimaryColumn({ unique: true })
  @ApiProperty({ enum: PerkName, enumName: "PerkName" })
  readonly name: PerkNameType;

  @Column({ type: "enum", enum: PerkTriggerValues })
  @ApiProperty({ enum: PerkTrigger, enumName: "PerkTrigger" })
  readonly trigger: PerkTriggerType;
}
