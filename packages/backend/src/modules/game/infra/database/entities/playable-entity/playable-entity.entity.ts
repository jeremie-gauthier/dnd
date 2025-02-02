import { PlayableEntityFactionType } from "src/database/enums/playable-entity-faction.enum";
import { PlayableEntityRaceType } from "src/database/enums/playable-entity-race.enum";
import { PlayableEntityTypeType } from "src/database/enums/playable-entity-type.enum";
import { CurrentPhaseType } from "../../enums/current-phase.enum";
import { ActionHistory } from "../action-history.entity";
import { Coord } from "../coord.entity";
import { Inventory } from "../inventory.entity";
import { PlayableEntityCondition } from "../playable-entity-condition.entity";

export abstract class PlayableEntity {
  id: string;

  abstract faction: PlayableEntityFactionType;

  type: PlayableEntityTypeType;

  race: PlayableEntityRaceType;

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
