import { Column, Entity, PrimaryColumn } from "typeorm";
import { PlayableEntityRaceType } from "../enums/playable-entity-race.enum";
import {
  PlayableEntityTypeType,
  PlayableEntityTypeValues,
} from "../enums/playable-entity-type.enum";
import { Characteristic } from "./characteristic.entity";
import { InventoryTemplate } from "./inventory-template.entity";

@Entity()
export class MonsterTemplate {
  @PrimaryColumn()
  readonly race: PlayableEntityRaceType;

  @Column({ type: "enum", enum: PlayableEntityTypeValues, nullable: false })
  readonly type: PlayableEntityTypeType;

  @Column(() => Characteristic)
  readonly characteristic: Characteristic;

  @Column({ type: "json" })
  readonly inventory: InventoryTemplate;
}
