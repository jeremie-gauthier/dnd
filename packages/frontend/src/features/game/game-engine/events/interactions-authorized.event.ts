import { Coord, GameItem, Tile } from "@dnd/shared";

export type Interaction =
  | {
      name: "attack";
      attack: Extract<
        GameItem,
        { type: "Weapon" | "Spell" }
      >["attacks"][number];
      onInteract: () => void;
    }
  | {
      name: "openDoor";
      onInteract: () => void;
    }
  | {
      name: "openChest";
      onInteract: () => Promise<void>;
    };

export class InteractionsAuthorizedEvent extends Event {
  public static readonly EventName = "InteractionsAuthorized";

  constructor(
    public readonly isometricCoord: Coord,
    public readonly tile: Tile,
    public readonly interactions: Array<Interaction>,
  ) {
    super("InteractionsAuthorized");
  }
}
