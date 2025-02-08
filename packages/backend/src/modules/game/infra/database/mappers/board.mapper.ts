import { Injectable } from "@nestjs/common";
import { Board as BoardDomain } from "src/modules/game/domain/board/board.entity";
import { Coord as CoordDomain } from "src/modules/game/domain/coord/coord.vo";
import { BoundingBox as BoundingBoxDomain } from "src/modules/game/domain/rooms/room/bounding-box/bounding-box.entity";
import { Room as RoomDomain } from "src/modules/game/domain/rooms/room/room.entity";
import { Rooms as RoomsDomain } from "src/modules/game/domain/rooms/rooms.aggregate";
import { Tile as TileDomain } from "src/modules/game/domain/tile/tile.entity";
import { Mapper } from "src/modules/shared/infra/mapper";
import { Board as BoardPersistence } from "../entities/board.entity";
import { Room as RoomPersistence } from "../entities/room/room.entity";
import { TileEntityFactory } from "./factories/tile-entity.factory";

@Injectable()
export class BoardMapper extends Mapper<BoardPersistence, BoardDomain> {
  public toDomain({
    rooms,
    ...persistence
  }: BoardPersistence & {
    rooms: Array<RoomPersistence>;
  }): BoardDomain {
    return new BoardDomain({
      height: persistence.height,
      width: persistence.width,
      tiles: persistence.tiles.map(
        (tile) =>
          new TileDomain({
            coord: new CoordDomain(tile.coord),
            isStartingTile: false,
            entities: [
              ...tile.playableEntities,
              ...tile.interactiveEntities,
              ...tile.nonInteractiveEntities,
            ].map((tileEntity) => TileEntityFactory.create({ tileEntity })),
          }),
      ),
      rooms: new RoomsDomain({
        values: rooms.map(
          (room) =>
            new RoomDomain({
              id: room.id,
              hasBeenVisited: room.hasBeenVisited,
              boundingBoxes: room.boundingBoxes.map(
                (boundingBox) =>
                  new BoundingBoxDomain({
                    topLeft: new CoordDomain(boundingBox.topLeft),
                    bottomRight: new CoordDomain(boundingBox.bottomRight),
                  }),
              ),
            }),
        ),
      }),
    });
  }

  public toPersistence(domain: BoardDomain): BoardPersistence {
    throw new Error("Method not implemented.");
  }
}
