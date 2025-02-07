import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import {
  PlayableCharacterType,
  PlayableCharacterTypeType,
} from "../../infra/database/enums/playable-character-type.enum";
import { User } from "../user/user.entity";
import { PlayableCharacterError } from "./playable-character.error";

type Data = {
  id: string;
  type: PlayableCharacterTypeType;
  pickedBy?: User["id"];
};

export class PlayableCharacter extends Entity<Data> {
  private static readonly schema = z.object({
    id: z.string().uuid(),
    type: z.enum([
      PlayableCharacterType.HERO,
      PlayableCharacterType.GAME_MASTER,
    ]),
    pickedBy: z.string().optional(),
  });

  constructor(rawData: Data) {
    const data = PlayableCharacter.schema.parse(rawData);
    super(data, data.id);
  }

  public get type() {
    return this._data.type;
  }

  public get pickedBy() {
    return this._data.pickedBy;
  }

  public override toPlain() {
    return {
      id: this._data.id,
      type: this._data.type,
      pickedBy: this._data.pickedBy,
    };
  }

  public setOwner({ user }: { user: User }) {
    this.mustBeAvailable();
    user.status.mustNotBeReady();

    this._data.pickedBy = user.id;
  }

  public unsetOwner({ user }: { user: User }) {
    user.status.mustNotBeReady();
    this.mustBeOwnBy({ user });

    this._data.pickedBy = undefined;
  }

  private mustBeAvailable() {
    if (this.pickedBy !== undefined) {
      throw new PlayableCharacterError({
        name: "PLAYABLE_CHARACTER_ALREADY_PICKED",
        message: "Hero has already been picked",
      });
    }
  }

  private mustBeOwnBy({ user }: { user: User }) {
    if (this.pickedBy !== user.id) {
      throw new PlayableCharacterError({
        name: "BAD_OWNER",
        message: `User ${user.id} does not own Hero ${this.id}`,
      });
    }
  }
}
