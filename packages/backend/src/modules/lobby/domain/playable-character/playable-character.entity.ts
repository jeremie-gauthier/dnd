import { Entity } from "src/modules/shared/domain/entity";
import { UniqueId } from "src/modules/shared/domain/unique-id";
import { User } from "../user/user.entity";
import { PlayableCharacterError } from "./playable-character.error";

type Data = {
  id: UniqueId;
  type: "hero" | "game_master";
  pickedBy?: User["id"];
};

export class PlayableCharacter extends Entity<Data> {
  constructor(data: Data) {
    super(data, data.id);
  }

  public get type() {
    return this._data.type;
  }

  public get pickedBy() {
    return this._data.pickedBy;
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
    if (!this.pickedBy?.equals(user.id)) {
      throw new PlayableCharacterError({
        name: "BAD_OWNER",
        message: `User ${user.id} does not own Hero ${this.id}`,
      });
    }
  }
}
