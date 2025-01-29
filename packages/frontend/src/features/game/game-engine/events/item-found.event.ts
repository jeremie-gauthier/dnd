import { Item } from "@features/game/interfaces/dnd-api/item.interface";

export class ItemFoundEvent extends Event {
  public static readonly EventName = "ItemFound";

  constructor(public readonly itemFound: Item) {
    super("ItemFound");
  }
}
