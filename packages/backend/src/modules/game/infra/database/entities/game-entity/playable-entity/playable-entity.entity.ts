import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  TableInheritance,
} from "typeorm";
import {
  CurrentPhaseType,
  CurrentPhaseValues,
} from "../../../enums/current-phase.enum";
import {
  PlayableEntityFactionType,
  PlayableEntityFactionValues,
} from "../../../enums/playable-entity-faction.enum";
import {
  PlayableEntityRaceType,
  PlayableEntityRaceValues,
} from "../../../enums/playable-entity-race.enum";
import {
  PlayableEntityArchetypeType,
  PlayableEntityArchetypeValues,
} from "../../../enums/playable-entity-type.enum";
import { EntityType } from "../../../enums/tile-entity-type.enum";
import { ActionHistory } from "../../action-history.entity";
import { Coord } from "../../coord.entity";
import { PlayableEntityCondition } from "../../playable-entity-condition.entity";
import { Tile } from "../../tile.entity";
import { Characteristic } from "./characteristic.entity";
import { Inventory } from "./inventory/inventory.entity";

@Entity()
@TableInheritance({ column: "faction" })
export class PlayableEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  readonly type = EntityType.PLAYABLE_ENTITY;

  @ManyToOne(
    () => Tile,
    (tile) => tile.playableEntities,
    { onDelete: "CASCADE", nullable: false },
  )
  readonly tile: Relation<Tile>;

  @Column({ type: "enum", enum: PlayableEntityFactionValues, update: false })
  readonly faction: PlayableEntityFactionType;

  @Column({ type: "enum", enum: PlayableEntityArchetypeValues, update: false })
  readonly archetype: PlayableEntityArchetypeType;

  @Column({ type: "enum", enum: PlayableEntityRaceValues, update: false })
  readonly race: PlayableEntityRaceType;

  @Column({ type: "enum", enum: CurrentPhaseValues })
  currentPhase: CurrentPhaseType;

  @Column()
  readonly playedByUserId: string;

  @Column({ nullable: false })
  readonly name: string;

  @Column({ nullable: false })
  initiative: number;

  @Column(() => Coord)
  coord: Coord;

  @Column({ nullable: false })
  isBlocking: boolean;

  @Column(() => Characteristic)
  readonly baseCharacteristic: Characteristic;

  @Column(() => Characteristic)
  characteristic: Characteristic;

  @OneToOne(() => Inventory, { cascade: true })
  inventory: Relation<Inventory>;

  @OneToMany(
    () => ActionHistory,
    (actionHistory) => actionHistory.playableEntity,
    { cascade: true },
  )
  actionsDoneThisTurn: Relation<ActionHistory[]>;

  @OneToMany(
    () => PlayableEntityCondition,
    (playableEntityCondition) => playableEntityCondition.playableEntity,
    { cascade: true },
  )
  conditions: Relation<PlayableEntityCondition[]>;
}
