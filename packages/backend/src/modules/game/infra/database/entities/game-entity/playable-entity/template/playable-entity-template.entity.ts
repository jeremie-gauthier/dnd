import {
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import {
  PlayableEntityRaceType,
  PlayableEntityRaceValues,
} from "../../../../enums/playable-entity-race.enum";
import {
  PlayableEntityArchetypeType,
  PlayableEntityArchetypeValues,
} from "../../../../enums/playable-entity-type.enum";
import { Characteristic } from "../characteristic.entity";
import { Inventory } from "../inventory/inventory.entity";

export abstract class PlayableEntityTemplate {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "enum", enum: PlayableEntityRaceValues, update: false })
  readonly race: PlayableEntityRaceType;

  @Column({ type: "enum", enum: PlayableEntityArchetypeValues, update: false })
  readonly archetype: PlayableEntityArchetypeType;

  @Column(() => Characteristic)
  readonly characteristic: Characteristic;

  @OneToOne(() => Inventory, { cascade: true, nullable: false })
  @JoinColumn()
  readonly inventory: Relation<Inventory>;
}
