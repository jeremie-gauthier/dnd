import { ApiProperty } from "@nestjs/swagger";
import { Column, PrimaryGeneratedColumn } from "typeorm";
import {
  HeroClass,
  HeroClassType,
  HeroClassValues,
} from "../enums/hero-class.enum";
import {
  PlayableEntityRace,
  PlayableEntityRaceType,
  PlayableEntityRaceValues,
} from "../enums/playable-entity-race.enum";
import {
  PlayableEntityType,
  PlayableEntityTypeType,
  PlayableEntityTypeValues,
} from "../enums/playable-entity-type.enum";
import { Characteristic } from "./characteristic.entity";

export class PlayableEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "enum", enum: PlayableEntityTypeValues, nullable: false })
  @ApiProperty({ enum: PlayableEntityType, enumName: "PlayableEntityType" })
  readonly type: PlayableEntityTypeType;

  @Column({ type: "enum", enum: PlayableEntityRaceValues, nullable: false })
  @ApiProperty({ enum: PlayableEntityRace, enumName: "PlayableEntityRace" })
  readonly race: PlayableEntityRaceType;

  @Column({ nullable: false })
  readonly name: string;

  @Column({ type: "enum", enum: HeroClassValues, nullable: false })
  @ApiProperty({ enum: HeroClass, enumName: "HeroClass" })
  readonly class: HeroClassType;

  @Column({ nullable: false })
  readonly level: number;

  @Column(() => Characteristic)
  readonly characteristic: Characteristic;
}
