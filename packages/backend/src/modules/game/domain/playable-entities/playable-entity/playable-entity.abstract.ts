import { GameItem, TilePath } from "@dnd/shared";
import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { Coord } from "../../coord/coord.vo";
import { Initiative } from "./initiative/initiative.vo";
import { Inventory } from "./inventory/inventory.entity";
import { PlayableEntityError } from "./playable-entity.error";
import { PlayerStatus } from "./player-status/player-status.vo";

export interface BehaviourMove {
  move(_: { path: TilePath }): void;
}

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

  protected mustBeAlive() {
    if (this.isDead) {
      throw new Error(
        "Playable Entity must be alive in order to perform this action",
      );
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
    this._data.status = this._data.status.advanceTo({ currentPhase: "IDLE" });
  }

  public startTurn() {
    this._data.status = this._data.status.advanceTo({ currentPhase: "ACTION" });
    this._data.characteristic.actionPoints =
      this._data.characteristic.baseActionPoints;
  }

  public setCoord(coord: Coord) {
    this._data.coord = coord;
  }

  public rollInitiative() {
    this._data.initiative = this.initiative.roll();
  }
}
