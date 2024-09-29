import { Coord, Room, TileEntity } from "../game";
import { GameEvent } from "../game/game-event.type";
import { WinCondition } from "../game/win-condition.type";

type Entity = Coord &
  Pick<
    Extract<
      TileEntity,
      {
        type:
          | "non-playable-non-interactive-entity"
          | "non-playable-interactive-entity";
      }
    >,
    "kind"
  >;

export type MapCompiledJson = {
  height: number;
  width: number;
  startingPositions: Coord[];
  entities: Entity[];
  events: GameEvent[];
  winConditions: WinCondition[];
  rooms: Room[];
};
