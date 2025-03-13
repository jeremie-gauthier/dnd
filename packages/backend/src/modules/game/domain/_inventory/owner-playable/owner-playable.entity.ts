import { ActionName } from "src/modules/game/infra/database/enums/action-name.enum";
import { Entity, PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { ActionHistory } from "./actions-history.interface";
import { PlayableEntityError } from "./playable.error";

type Data = {
  readonly id: string;
  readonly playedByUserId: string;
  characteristic: {
    actionPoints: number;
    healthPoints: number;
  };
  actionsDoneThisTurn: Array<ActionHistory>;
};

export class OwnerPlayable extends Entity<Data> {
  private static readonly schema = z.object({
    id: z.string().uuid(),
    playedByUserId: z.string().uuid(),
    characteristic: z.object({
      healthPoints: z.number().min(0),
      actionPoints: z.number().min(0),
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

  constructor(rawData: Data) {
    const data = OwnerPlayable.schema.parse(rawData);
    super(data, rawData.id);
  }

  // #region Getters

  public get isDead() {
    return this._data.characteristic.healthPoints <= 0;
  }

  // #region Methods

  public mustBePlayedBy({ userId }: { userId: Data["playedByUserId"] }) {
    if (this._data.playedByUserId !== userId) {
      throw new PlayableEntityError({
        name: "BAD_OWNERSHIP",
        message: `Playable entity does not belongs to user '${userId}'`,
      });
    }
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

  protected mustHaveActionPoints() {
    if (this._data.characteristic.actionPoints < 1) {
      throw new PlayableEntityError({
        name: "NOT_ENOUGH_ACTION_POINTS",
        message: `Playable Entity ${this.id} cannot act`,
      });
    }
  }

  public actSwapItems(): void {
    this.mustBeAlive();
    this.mustHaveActionPoints();

    this._data.actionsDoneThisTurn.push({ name: "swap_items" });
    this._data.characteristic.actionPoints -= 1;
  }

  public override toPlain(): PlainData<Data> {
    throw new Error("Method not implemented.");
  }
}
