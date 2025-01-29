import { PerkNameType, PerkTriggerType, PerkTriggerValues } from "@dnd/shared";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Perk {
  @PrimaryColumn({ unique: true })
  readonly name: PerkNameType;

  @Column({ type: "enum", enum: PerkTriggerValues })
  readonly trigger: PerkTriggerType;
}
