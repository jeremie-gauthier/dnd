import { AttackResponseDto, CoordResponseDto, Tile } from "@/openapi/dnd-api";

export type Interaction =
  | {
      name: "attack";
      attack: AttackResponseDto;
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
    public readonly isometricCoord: CoordResponseDto,
    public readonly tile: Tile,
    public readonly interactions: Array<Interaction>,
  ) {
    super("InteractionsAuthorized");
  }
}
