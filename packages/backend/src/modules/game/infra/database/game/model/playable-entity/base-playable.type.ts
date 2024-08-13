import { Coord } from "../coord.type";
import { Inventory } from "../inventory.type";

export type BasePlayableEntity = {
  id: string;

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
    name: "attack" | "move" | "open_door";
  }>;
};
