import { ActionName } from "src/modules/game/infra/database/enums/action-name.enum";
import { CurrentPhase } from "src/modules/game/infra/database/enums/current-phase.enum";
import {
  PlayableEntityFaction,
  PlayableEntityFactionType,
} from "src/modules/game/infra/database/enums/playable-entity-faction.enum";
import {
  EntityType,
  EntityTypeType,
} from "src/modules/game/infra/database/enums/tile-entity-type.enum";
import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Coord } from "../../common/coord/coord.vo";
import { PlayerStatus } from "../../common/player-status/player-status.vo";
import { ActionHistory } from "./actions-history.interface";
import { MoveBehaviour } from "./move-behaviours/move-behaviour.interface";
import { PlayableEntityError } from "./playable.error";

type Data = {
  readonly id: string;
  readonly type: EntityTypeType;
  readonly faction: PlayableEntityFactionType;
  status: PlayerStatus;
  coord: Coord;
  isBlocking: boolean;
  playedByUserId: string;
  readonly baseCharacteristic: {
    readonly actionPoints: number;
    readonly healthPoints: number;
    readonly movementPoints: number;
  };
  characteristic: {
    actionPoints: number;
    healthPoints: number;
    movementPoints: number;
  };
  actionsDoneThisTurn: Array<ActionHistory>;
};

export class Playable extends Entity<Data> {
  private static readonly schema = z.object({
    id: z.string(),
    type: z
      .literal(EntityType.PLAYABLE_ENTITY)
      .optional()
      .default(EntityType.PLAYABLE_ENTITY),
    faction: z.enum([
      PlayableEntityFaction.HERO,
      PlayableEntityFaction.MONSTER,
    ]),
    status: z.instanceof(PlayerStatus),
    playedByUserId: z.string(),
    coord: z.instanceof(Coord),
    isBlocking: z.boolean(),
    baseCharacteristic: z
      .object({
        healthPoints: z.number().min(1),
        actionPoints: z.number().min(1),
        movementPoints: z.number().min(1),
      })
      .readonly(),
    characteristic: z.object({
      healthPoints: z.number().min(1),
      actionPoints: z.number().min(1),
      movementPoints: z.number().min(0),
    }),
    actionsDoneThisTurn: z.array(
      z.object({
        name: z.enum([
          ActionName.ATTACK,
          ActionName.MOVE,
          ActionName.DELETE_ITEM,
          ActionName.OPEN_CHEST,
          ActionName.OPEN_DOOR,
          ActionName.SWAP_ITEMS,
        ]),
      }),
    ),
  });

  constructor(
    rawData: Data,
    public readonly moveBehaviour: MoveBehaviour,
  ) {
    const data = Playable.schema.parse(rawData);
    super(data, rawData.id);
  }

  // #region Getters

  public get isDead() {
    return (
      this._data.characteristic.healthPoints <= 0 &&
      this._data.isBlocking === false
    );
  }

  public get baseCharacteristic() {
    return this._data.baseCharacteristic;
  }

  public get characteristic() {
    return this._data.characteristic;
  }

  public get coord() {
    return this._data.coord;
  }

  public get faction() {
    return this._data.faction;
  }

  public get isPlaying() {
    return this._data.status.current === CurrentPhase.ACTION;
  }

  public get actionsDoneThisTurn() {
    return this._data.actionsDoneThisTurn;
  }

  // #region Methods

  public isHero(): boolean {
    return this._data.faction === PlayableEntityFaction.HERO;
  }

  public isMonster(): boolean {
    return this._data.faction === PlayableEntityFaction.MONSTER;
  }

  public setCoord(coord: Coord) {
    this._data.coord = coord;
  }

  public actMove(): void {
    this.mustBeAlive();
    this.mustHaveActionPoints();

    this._data.actionsDoneThisTurn.push({ name: "move" });
    this._data.characteristic.actionPoints -= 1;
  }

  public mustBeAlive() {
    if (this.isDead) {
      throw new PlayableEntityError({
        name: "NOT_ALIVE",
        message:
          "Playable Entity must be alive in order to perform this action",
      });
    }
  }

  public mustBePlayedBy({ userId }: { userId: Data["playedByUserId"] }) {
    if (this._data.playedByUserId !== userId) {
      throw new PlayableEntityError({
        name: "BAD_OWNERSHIP",
        message: `Playable entity does not belongs to user '${userId}'`,
      });
    }
  }

  protected mustHaveActionPoints() {
    if (this._data.characteristic.actionPoints < 1) {
      throw new PlayableEntityError({
        name: "NOT_ENOUGH_ACTION_POINTS",
        message: `Playable Entity ${this.id} cannot act`,
      });
    }
  }

  public override toPlain(): PlainData<Data> {
    throw new Error("Method not implemented.");
  }
}
