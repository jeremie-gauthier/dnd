import { Playable } from "../../../playable-entities/playable-entity/playable-entity.abstract";
import { TileEntity } from "../tile-entity.abstract";
import { Chest } from "./chest.entity";
import { Door } from "./door.entity";
import { TileInteractiveEntityError } from "./interactive.error";
import { Trap } from "./trap.entity";

type Data = {
  readonly type: "interactive-entity";
  readonly kind: "chest" | "door" | "trap";
  isBlocking: boolean;
  isVisible: boolean;
  canInteract: boolean;
  [key: string]: any;
};

export abstract class TileInteractiveEntity<
  ChildData extends Data = Data,
> extends TileEntity<ChildData> {
  public abstract onInteraction(_: { playableEntity: Playable }): void;

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

  public isTrap(): this is Trap {
    return this._data.kind === "trap";
  }

  public isChest(): this is Chest {
    return this._data.kind === "chest";
  }
}
