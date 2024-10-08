import {
  HeroClassType,
  HeroClassValues,
  PlayableEntityRaceType,
  PlayableEntityRaceValues,
  PlayableEntityTypeType,
  PlayableEntityTypeValues,
} from "@dnd/shared";
import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Characteristic } from "./characteristic";

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
