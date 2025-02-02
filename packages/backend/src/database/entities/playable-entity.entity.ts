import { Column, PrimaryGeneratedColumn } from "typeorm";
import { HeroClassType, HeroClassValues } from "../enums/hero-class.enum";
import {
  PlayableEntityRaceType,
  PlayableEntityRaceValues,
} from "../enums/playable-entity-race.enum";
import {
  PlayableEntityTypeType,
  PlayableEntityTypeValues,
} from "../enums/playable-entity-type.enum";
import { Characteristic } from "./characteristic.entity";

export class PlayableEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "enum", enum: PlayableEntityTypeValues, nullable: false })
  readonly type: PlayableEntityTypeType;

  @Column({ type: "enum", enum: PlayableEntityRaceValues, nullable: false })
  readonly race: PlayableEntityRaceType;

  @Column({ nullable: false })
  readonly name: string;

  @Column({ type: "enum", enum: HeroClassValues, nullable: false })
  readonly class: HeroClassType;

  @Column({ nullable: false })
  readonly level: number;

  @Column(() => Characteristic)
  readonly characteristic: Characteristic;
}
