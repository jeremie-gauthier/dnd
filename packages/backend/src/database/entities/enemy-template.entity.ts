import { InventoryJson } from "@dnd/shared";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";
import { PlayableEntityRaceType } from "../enums/playable-entity-race.enum";
import {
  PlayableEntityType,
  PlayableEntityTypeType,
  PlayableEntityTypeValues,
} from "../enums/playable-entity-type.enum";
import { Characteristic } from "./characteristic.entity";

@Entity()
export class MonsterTemplate {
  @PrimaryColumn()
  readonly race: PlayableEntityRaceType;

  @ApiProperty({ enum: PlayableEntityType, enumName: "PlayableEntityType" })
  @Column({ type: "enum", enum: PlayableEntityTypeValues, nullable: false })
  readonly type: PlayableEntityTypeType;

  @Column(() => Characteristic)
  readonly characteristic: Characteristic;

  @Column({ type: "json" })
  readonly inventory: InventoryJson;
}
