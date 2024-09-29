import {
  InventoryJson,
  PlayableEntityRaceType,
  PlayableEntityTypeType,
  PlayableEntityTypeValues,
} from "@dnd/shared";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { Characteristic } from "./characteristic";

@Entity()
export class MonsterTemplate {
  @PrimaryColumn()
  readonly race: PlayableEntityRaceType;

  @Column({ type: "enum", enum: PlayableEntityTypeValues, nullable: false })
  readonly type: PlayableEntityTypeType;

  @Column(() => Characteristic)
  readonly characteristic: Characteristic;

  @Column({ type: "json" })
  readonly inventory: InventoryJson;
}
