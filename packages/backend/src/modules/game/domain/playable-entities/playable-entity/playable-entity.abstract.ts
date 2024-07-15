import { GameItem } from "@dnd/shared";
import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { Coord } from "../../coord/coord.vo";
import { Inventory } from "../../inventory/inventory.entity";
import { Tile } from "../../tile/tile.entity";
import { BehaviourMove } from "./behaviour-move/behaviour-move.interface";
import { Initiative } from "./initiative/initiative.vo";
import { PlayableEntityError } from "./playable-entity.error";
import { PlayerStatus } from "./player-status/player-status.vo";

type Data = {
  readonly id: string;
  readonly name: string;
  readonly type: "hero" | "monster";
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

export abstract class Playable<
  ChildData extends Data = Data,
> extends Entity<ChildData> {
  abstract readonly behaviourMove: BehaviourMove;
  abstract attack(_: {
    attack: GameItem["attacks"][number];
    target: Playable;
  }): void;
  public abstract act(): void;

  public abstract toPlain(): PlainData<ChildData>;

  constructor(rawData: ChildData) {
    super(rawData, rawData.id);
  }

  get healthPoints() {
    return this._data.characteristic.healthPoints;
  }

  get isAlive() {
    return this.healthPoints > 0;
  }

  get isDead() {
    return this.healthPoints <= 0 && this._data.isBlocking === false;
  }

  get initiative() {
    return this._data.initiative;
  }

  get coord() {
    return this._data.coord;
  }

  get type() {
    return this._data.type;
  }

  get isBlocking() {
    return this._data.isBlocking;
  }

  protected mustBeAlive() {
    if (this.isDead) {
      throw new PlayableEntityError({
        name: "NOT_ALIVE",
        message:
          "Playable Entity must be alive in order to perform this action",
      });
    }
  }

  public takeDamage({ amount }: { amount: number }): number {
    this.mustBeAlive();

    const damageTaken = amount - this._data.characteristic.armorClass;
    if (damageTaken <= 0) {
      return 0;
    }

    this._data.characteristic.healthPoints -= damageTaken;
    if (this.healthPoints <= 0) {
      this.death();
    }
    return damageTaken;
  }

  protected death(): void {
    this._data.characteristic.healthPoints = 0;
    this._data.isBlocking = false;
  }

  public mustBePlayedBy({ userId }: { userId: Data["playedByUserId"] }) {
    if (this._data.playedByUserId !== userId) {
      throw new PlayableEntityError({
        name: "BAD_OWNERSHIP",
        message: `Playable entity does not belongs to user '${userId}'`,
      });
    }
  }

  public isPlaying() {
    return this._data.status.current === "ACTION";
  }

  public endTurn() {
    this._data.status = this._data.status.advanceTo("IDLE");
  }

  public startTurn() {
    this._data.status = this._data.status.advanceTo("ACTION");
    this._data.characteristic.actionPoints =
      this._data.characteristic.baseActionPoints;
  }

  public setCoord(coord: Coord) {
    this._data.coord = coord;
  }

  public rollInitiative() {
    this._data.initiative = this.initiative.roll();
  }

  protected mustHaveActionPoints() {
    if (this._data.characteristic.actionPoints < 1) {
      throw new PlayableEntityError({
        name: "NOT_ENOUGH_ACTION_POINTS",
        message: `Playable Entity ${this.id} cannot act`,
      });
    }
  }

  public getMovePath({ path }: { path: Array<Tile> }) {
    return this.behaviourMove.getMovePath({
      availableMovementPoints: this._data.characteristic.movementPoints,
      path,
      startingCoord: this.coord,
    });
  }
}
