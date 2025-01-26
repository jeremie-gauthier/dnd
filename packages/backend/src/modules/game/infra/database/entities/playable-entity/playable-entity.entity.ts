import { ApiProperty } from "@nestjs/swagger";
import {
  PlayableEntityRace,
  PlayableEntityRaceType,
} from "src/database/enums/playable-entity-race.enum";
import {
  PlayableEntityType,
  PlayableEntityTypeType,
} from "src/database/enums/playable-entity-type.enum";
import { Coord } from "../coord.entity";
import { Inventory } from "../inventory.entity";
import { PlayableEntityCondition } from "../playable-entity-condition.entity";

export abstract class PlayableEntity {
  id: string;

  abstract faction: "hero" | "monster";

  @ApiProperty({ enum: PlayableEntityType, enumName: "PlayableEntityType" })
  type: PlayableEntityTypeType;

  @ApiProperty({ enum: PlayableEntityRace, enumName: "PlayableEntityRace" })
  race: PlayableEntityRaceType;

  currentPhase: "preparation" | "idle" | "action";
  playedByUserId: string;

  name: string;

  initiative: number;
  coord: Coord;
  isBlocking: boolean;

  characteristic: {
    baseHealthPoints: number;
    healthPoints: number;

    baseManaPoints: number;
    manaPoints: number;

    baseArmorClass: number;
    armorClass: number;

    baseMovementPoints: number;
    movementPoints: number;

    baseActionPoints: number;
    actionPoints: number;
  };
  inventory: Inventory;
  actionsDoneThisTurn: Array<{
    name:
      | "attack"
      | "move"
      | "open_door"
      | "delete_item"
      | "swap_items"
      | "open_chest";
  }>;
  conditions: Array<PlayableEntityCondition>;
}
