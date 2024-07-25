import { HeroClassType } from "@dnd/shared";
import { z } from "zod";
import { Coord } from "../../coord/coord.vo";
import { Inventory } from "../../inventory/inventory.entity";
import { BehaviourAttack } from "./behaviour-attack/behaviour-attack.interface";
import { BehaviourDefender } from "./behaviour-defender/behaviour-defender.interface";
import { BehaviourMove } from "./behaviour-move/behaviour-move.interface";
import { Initiative } from "./initiative/initiative.vo";
import { Playable } from "./playable-entity.abstract";
import { PlayerStatus } from "./player-status/player-status.vo";

type Data = {
  readonly id: string;
  readonly name: string;
  readonly faction: "hero";
  readonly class: HeroClassType;
  coord: Coord;
  isBlocking: boolean;

  status: PlayerStatus;
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

export class Hero extends Playable<Data> {
  private static schema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    faction: z.literal("hero").default("hero"),
    class: z.enum(["WARRIOR", "CLERIC", "SORCERER", "THIEF"]),
    coord: z.instanceof(Coord),
    isBlocking: z.boolean(),
    status: z.instanceof(PlayerStatus),
    playedByUserId: z.string(),
    initiative: z.instanceof(Initiative),
    characteristic: z.object({
      baseHealthPoints: z.number().min(1),
      healthPoints: z.number().min(0),
      baseManaPoints: z.number().min(0),
      manaPoints: z.number().min(0),
      baseArmorClass: z.number().min(0),
      armorClass: z.number().min(0),
      baseMovementPoints: z.number().min(1),
      movementPoints: z.number().min(0),
      baseActionPoints: z.number().min(1),
      actionPoints: z.number().min(0),
    }),
    inventory: z.instanceof(Inventory),
  });

  public behaviourMove: BehaviourMove;
  public behaviourAttack: BehaviourAttack;
  public behaviourDefender: BehaviourDefender;

  constructor(rawData: Omit<Data, "faction">) {
    const data = Hero.schema.parse(rawData);
    super(data);
  }

  public get class() {
    return this._data.class;
  }

  public buildBehaviourMove(behaviourMove: BehaviourMove) {
    this.behaviourMove = behaviourMove;
    return this;
  }

  public buildBehaviourAttack(behaviourAttack: BehaviourAttack) {
    this.behaviourAttack = behaviourAttack;
    return this;
  }

  public buildBehaviourDefender(behaviourDefender: BehaviourDefender) {
    this.behaviourDefender = behaviourDefender;
    return this;
  }

  public act(): void {
    this.mustBeAlive();
    this.mustHaveActionPoints();
    this._data.characteristic.actionPoints -= 1;
  }

  public toPlain() {
    return {
      id: this._data.id,
      name: this._data.name,
      faction: this._data.faction,
      class: this._data.class,
      coord: this._data.coord.toPlain(),
      isBlocking: this._data.isBlocking,
      initiative: this._data.initiative.toPlain(),
      playedByUserId: this._data.playedByUserId,
      status: this._data.status.toPlain(),
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
