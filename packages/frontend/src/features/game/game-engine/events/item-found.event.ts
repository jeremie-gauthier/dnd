import { GameItem } from "@dnd/shared";

export class ItemFoundEvent extends Event {
  public static readonly EventName = "ItemFound";

  constructor(public readonly itemFound: GameItem) {
    super("ItemFound");
  }
}
