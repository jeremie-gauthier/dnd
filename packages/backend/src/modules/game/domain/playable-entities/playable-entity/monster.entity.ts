import { EnemyKind } from "@dnd/shared";
import { z } from "zod";
import { Coord } from "../../coord/coord.vo";
import { Inventory } from "../../inventory/inventory.entity";
import { ActionHistory } from "./actions-history.interface";
import { BehaviourAttack } from "./behaviour-attack/behaviour-attack.interface";
import { BehaviourDefender } from "./behaviour-defender/behaviour-defender.interface";
import { BehaviourMove } from "./behaviour-move/behaviour-move.interface";
import { Initiative } from "./initiative/initiative.vo";
import { Playable } from "./playable-entity.abstract";
import { PlayableEntityError } from "./playable-entity.error";
import { PlayerStatus } from "./player-status/player-status.vo";

type Data = {
  readonly id: string;
  readonly name: string;
  readonly faction: "monster";
  readonly kind: EnemyKind;
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
  actionsDoneThisTurn: Array<ActionHistory>;
};

export class Monster extends Playable<Data> {
  private static schema = z.object({
    id: z.string(),
    name: z.string(),
    faction: z.literal("monster").default("monster"),
    kind: z.enum(["goblin"]),
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
    actionsDoneThisTurn: z.array(
      z.object({
        name: z.enum(["attack", "move"]),
      }),
    ),
  });

  public behaviourMove: BehaviourMove;
  public behaviourAttack: BehaviourAttack;
  public behaviourDefender: BehaviourDefender;

  constructor(rawData: Omit<Data, "faction">) {
    const data = Monster.schema.parse(rawData);
    super(data);
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

  private mustNotHaveAttackedThisTurn() {
    if (
      this._data.actionsDoneThisTurn.some((action) => action.name === "attack")
    ) {
      throw new PlayableEntityError({
        name: "MONSTER_CANNOT_ATTACK_MORE_THAN_ONCE_PER_TURN",
        message: `${this._data.name} has already attacked this turn`,
      });
    }
  }

  private mustBeAValidAction({ action }: { action: ActionHistory["name"] }) {
    if (!["attack", "move"].includes(action)) {
      throw new PlayableEntityError({
        name: "FORBIDDEN_ACTION",
        message: `Monster is not allowed to perform '${action}' action`,
      });
    }
  }

  public act({ action }: { action: ActionHistory["name"] }): void {
    this.mustBeAlive();
    this.mustHaveActionPoints();
    this.mustBeAValidAction({ action });

    if (action === "attack") {
      this.mustNotHaveAttackedThisTurn();
    }

    this._data.actionsDoneThisTurn.push({ name: action });
    this._data.characteristic.actionPoints -= 1;
  }

  public toPlain() {
    return {
      id: this._data.id,
      name: this._data.name,
      faction: this._data.faction,
      kind: this._data.kind,
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
      actionsDoneThisTurn: this._data.actionsDoneThisTurn,
    };
  }
}
