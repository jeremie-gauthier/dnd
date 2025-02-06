import { Column, Entity, OneToOne, PrimaryColumn, Relation } from "typeorm";
import {
  PlayableEntityRaceType,
  PlayableEntityRaceValues,
} from "../../enums/playable-entity-race.enum";
import {
  PlayableEntityTypeType,
  PlayableEntityTypeValues,
} from "../../enums/playable-entity-type.enum";
import { Characteristic } from "../playable-entity/characteristic.entity";
import { Inventory } from "../playable-entity/inventory.entity";

@Entity()
export class MonsterTemplate {
  @PrimaryColumn({
    type: "enum",
    enum: PlayableEntityRaceValues,
    enumName: "PlayableEntityRace",
    update: false,
  })
  readonly race: PlayableEntityRaceType;

  @Column({
    type: "enum",
    enum: PlayableEntityTypeValues,
    enumName: "PlayableEntityType",
    update: false,
  })
  readonly type: PlayableEntityTypeType;

  @Column(() => Characteristic)
  readonly characteristic: Characteristic;

  @OneToOne(() => Inventory, { cascade: true })
  readonly inventory: Relation<Inventory>;
}
