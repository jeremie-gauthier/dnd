import { z } from "zod";
import { TileInteractiveEntity } from "./interactive.abstract";

type Data = {
  readonly type: "interactive-entity";
  readonly kind: "chest";
  isBlocking: boolean;
  isVisible: boolean;
  canInteract: boolean;
};

export class Chest extends TileInteractiveEntity<Data> {
  private static readonly schema = z.object({
    type: z.literal("interactive-entity").default("interactive-entity"),
    kind: z.literal("chest").default("chest"),
    isBlocking: z.boolean(),
    isVisible: z.boolean(),
    canInteract: z.boolean(),
  });

  constructor(rawData: Omit<Data, "type" | "kind">) {
    const data = Chest.schema.parse(rawData);
    super(data);
  }

  get canInteract(): boolean {
    return this._data.canInteract;
  }

  public override onInteraction(): void {
    this.mustBeInteractive();

    this._data.canInteract = false;
  }

  public override toPlain() {
    return {
      canInteract: this._data.canInteract,
      isBlocking: this._data.isBlocking,
      isVisible: this._data.isVisible,
      type: this._data.type,
      kind: this._data.kind,
    };
  }
}
