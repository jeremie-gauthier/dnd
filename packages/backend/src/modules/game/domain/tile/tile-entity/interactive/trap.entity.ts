import { Playable } from "../../../playable-entities/playable-entity/playable-entity.abstract";
import { TileInteractiveEntity } from "./interactive.abstract";

type Data = {
  readonly name: "pit";
  readonly type: "interactive-entity";
  readonly kind: "trap";
  isBlocking: boolean;
  isVisible: boolean;
  canInteract: boolean;
};

export class Trap extends TileInteractiveEntity<Data> {
  get canInteract(): boolean {
    return this._data.canInteract;
  }

  public onInteraction({ playableEntity }: { playableEntity: Playable }): void {
    // ! uniquement les regles metiers de Interactive
    // ! on cherche pas a savoir si le playable a des PA pour faire cette action
    // ? car si on peut ouvrir la porte par un moyen qui ne consomme pas de PA, alors on pourra reutiliser la methode telle quelle
    this.mustBeInteractive();

    this._data.isBlocking = false;
    this._data.canInteract = false;
  }

  public toPlain() {
    return {
      canInteract: this._data.canInteract,
      isBlocking: this._data.isBlocking,
      isVisible: this._data.isVisible,
      name: this._data.name,
      type: this._data.type,
      kind: this._data.kind,
    };
  }
}
