import { z } from "zod";
import { TileInteractiveEntity } from "./interactive.abstract";

type Data = {
  readonly type: "interactive-entity";
  readonly kind: "door";
  isBlocking: boolean;
  isVisible: boolean;
  canInteract: boolean;
};

export class Door extends TileInteractiveEntity<Data> {
  private static schema = z.object({
    type: z.literal("interactive-entity").default("interactive-entity"),
    kind: z.literal("door").default("door"),
    isBlocking: z.boolean(),
    isVisible: z.boolean(),
    canInteract: z.boolean(),
  });

  constructor(rawData: Omit<Data, "type" | "kind">) {
    const data = Door.schema.parse(rawData);
    super(data);
  }

  get canInteract(): boolean {
    return this._data.canInteract;
  }

  public onInteraction(): void {
    this.mustBeInteractive();

    this._data.isBlocking = false;
    this._data.canInteract = false;
  }

  public toPlain() {
    return {
      canInteract: this._data.canInteract,
      isBlocking: this._data.isBlocking,
      isVisible: this._data.isVisible,
      type: this._data.type,
      kind: this._data.kind,
    };
  }
}
