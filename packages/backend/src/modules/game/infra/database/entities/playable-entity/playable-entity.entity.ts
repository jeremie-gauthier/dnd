import { ApiProperty } from "@nestjs/swagger";
import {
  PlayableEntityFaction,
  PlayableEntityFactionType,
} from "src/database/enums/playable-entity-faction.enum";
import {
  PlayableEntityRace,
  PlayableEntityRaceType,
} from "src/database/enums/playable-entity-race.enum";
import {
  PlayableEntityType,
  PlayableEntityTypeType,
} from "src/database/enums/playable-entity-type.enum";
import { CurrentPhase, CurrentPhaseType } from "../../enums/current-phase.enum";
import { ActionHistory } from "../action-history.entity";
import { Coord } from "../coord.entity";
import { Inventory } from "../inventory.entity";
import { PlayableEntityCondition } from "../playable-entity-condition.entity";

export abstract class PlayableEntity {
  id: string;

  @ApiProperty({
    enum: PlayableEntityFaction,
    enumName: "PlayableEntityFaction",
  })
  abstract faction: PlayableEntityFactionType;

  @ApiProperty({ enum: PlayableEntityType, enumName: "PlayableEntityType" })
  type: PlayableEntityTypeType;

  @ApiProperty({ enum: PlayableEntityRace, enumName: "PlayableEntityRace" })
  race: PlayableEntityRaceType;

  @ApiProperty({ enum: CurrentPhase, enumName: "CurrentPhase" })
  currentPhase: CurrentPhaseType;
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
  actionsDoneThisTurn: Array<ActionHistory>;
  conditions: Array<PlayableEntityCondition>;
}
