import { PlainData } from "src/modules/shared/domain/entity";
import { Playable } from "../../../playable-entities/playable-entity/playable-entity.abstract";
import { TileEntity } from "../tile-entity.abstract";
import { Door } from "./door.entity";
import { TileInteractiveEntityError } from "./interactive.error";

type Data = {
  readonly type: "interactive-entity";
  readonly kind: "door" | "trap";
  isBlocking: boolean;
  isVisible: boolean;
  canInteract: boolean;
  [key: string]: any;
};

export abstract class TileInteractiveEntity<
  ChildData extends Data = Data,
> extends TileEntity<ChildData> {
  public abstract onInteraction(_: { playableEntity: Playable }): void;
  public abstract toPlain(): PlainData<ChildData>;

  get canInteract() {
    return this._data.canInteract;
  }

  protected mustBeInteractive() {
    if (!this.canInteract) {
      throw new TileInteractiveEntityError({
        name: "CANNOT_INTERACT",
        message: "Impossible d'interagir avec cette entité",
      });
    }
  }

  public isDoor(): this is Door {
    return this._data.kind === "door";
  }
}
