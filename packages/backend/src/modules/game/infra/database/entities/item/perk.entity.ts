import { Column, Entity, PrimaryColumn } from "typeorm";
import { PerkNameType } from "../../enums/perk-name.enum";
import {
  PerkTriggerType,
  PerkTriggerValues,
} from "../../enums/perk-trigger.enum";

@Entity()
export class Perk {
  @PrimaryColumn({ unique: true })
  readonly name: PerkNameType;

  @Column({ type: "enum", enum: PerkTriggerValues })
  readonly trigger: PerkTriggerType;
}
