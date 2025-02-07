import { Injectable } from "@nestjs/common";
import { Board as BoardDomain } from "src/modules/game/domain/board/board.entity";
import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { BoundingBox } from "src/modules/game/domain/rooms/room/bounding-box/bounding-box.entity";
import { Room } from "src/modules/game/domain/rooms/room/room.entity";
import { Rooms } from "src/modules/game/domain/rooms/rooms.aggregate";
import { Tile } from "src/modules/game/domain/tile/tile.entity";
import { Mapper } from "src/modules/shared/infra/mapper";
import { Board as BoardPersistence } from "../entities/board.entity";
import { TileEntityFactory } from "./factories/tile-entity.factory";

@Injectable()
export class BoardMapper extends Mapper<BoardPersistence, BoardDomain> {
  public toDomain(persistence: BoardPersistence): BoardDomain {
    return new BoardDomain({
      height: persistence.height,
      width: persistence.width,
      tiles: persistence.tiles.map(
        (tile) =>
          new Tile({
            coord: new Coord(tile.coord),
            isStartingTile: false,
            entities: tile.entities.map((tileEntity) =>
              TileEntityFactory.create({ tileEntity }),
            ),
          }),
      ),
      rooms: new Rooms({
        values: persistence.rooms.map(
          (room) =>
            new Room({
              id: room.id,
              hasBeenVisited: room.hasBeenVisited,
              boundingBoxes: room.boundingBoxes.map(
                (boundingBox) =>
                  new BoundingBox({
                    topLeft: new Coord(boundingBox.topLeft),
                    bottomRight: new Coord(boundingBox.bottomRight),
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
