import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { User } from "../user/user.entity";
import { PlayableCharacterError } from "./playable-character.error";

type Data = {
  id: string;
  type: "hero" | "game_master";
  pickedBy?: User["id"];
};

export class PlayableCharacter extends Entity<Data> {
  private static schema = z.object({
    id: z.string().uuid(),
    type: z.enum(["hero", "game_master"]),
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
