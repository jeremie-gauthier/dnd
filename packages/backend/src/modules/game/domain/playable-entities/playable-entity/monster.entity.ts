import { AttackRangeType, AttackTypeType, EnemyKind } from "@dnd/shared";
import { Coord } from "../../coord/coord.vo";
import { Initiative } from "../../initiative/initiative.vo";
import { Inventory } from "../../inventory/inventory.entity";
import { BehaviourMove, Playable } from "./playable-entity.abstract";

type Data = {
  readonly id: string;
  readonly name: string;
  readonly type: "monster";
  readonly kind: EnemyKind;
  coord: Coord;
  isBlocking: boolean;

  status: "preparation" | "idle" | "action";
  playedByUserId: string;

  initiative: Initiative;
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
};

export class Monster extends Playable<Data> {
  public readonly behaviourMove: BehaviourMove;

  public attack(_: {
    attack: {
      id: string;
      range: AttackRangeType;
      type: AttackTypeType;
      dices: {
        name: string;
        color: `#${string}`;
        values: [number, number, number, number, number, number];
        minValue: number;
        maxValue: number;
        meanValue: number;
      }[];
    };
    target: Playable;
  }): void {
    throw new Error("Method not implemented.");
  }

  public toPlain() {
    return {
      id: this._data.id,
      name: this._data.name,
      type: this._data.type,
      kind: this._data.kind,
      coord: this._data.coord.toPlain(),
      isBlocking: this._data.isBlocking,
      initiative: this._data.initiative.toPlain(),
      playedByUserId: this._data.playedByUserId,
      status: this._data.status,
      characteristic: {
        baseHealthPoints: this._data.characteristic.baseHealthPoints,
        healthPoints: this._data.characteristic.healthPoints,
        baseManaPoints: this._data.characteristic.baseManaPoints,
        manaPoints: this._data.characteristic.manaPoints,
        baseArmorClass: this._data.characteristic.baseArmorClass,
        armorClass: this._data.characteristic.armorClass,
        baseMovementPoints: this._data.characteristic.baseMovementPoints,
        movementPoints: this._data.characteristic.movementPoints,
        baseActionPoints: this._data.characteristic.baseActionPoints,
        actionPoints: this._data.characteristic.actionPoints,
      },
      inventory: this._data.inventory.toPlain(),
    };
  }
}
