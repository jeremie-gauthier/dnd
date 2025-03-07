import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board as BoardDomain } from "src/modules/game/domain/board/board.entity";
import { Coord as CoordDomain } from "src/modules/game/domain/coord/coord.vo";
import {
  BoundingBox,
  BoundingBox as BoundingBoxDomain,
} from "src/modules/game/domain/rooms/room/bounding-box/bounding-box.entity";
import { Room as RoomDomain } from "src/modules/game/domain/rooms/room/room.entity";
import { Rooms as RoomsDomain } from "src/modules/game/domain/rooms/rooms.aggregate";
import { TileInteractiveEntity } from "src/modules/game/domain/tile/tile-entity/interactive/interactive.abstract";
import { TileNonInteractiveEntity } from "src/modules/game/domain/tile/tile-entity/non-interactive/non-interactive.entity";
import { Tile as TileDomain } from "src/modules/game/domain/tile/tile.entity";
import { Mapper } from "src/modules/shared/infra/mapper";
import { Repository } from "typeorm";
import { Board as BoardPersistence } from "../entities/board.entity";
import { Room as RoomPersistence } from "../entities/room/room.entity";
import { EntityType } from "../enums/tile-entity-type.enum";
import { TileEntityFactory } from "./factories/tile-entity.factory";

@Injectable()
export class BoardMapper extends Mapper<BoardPersistence, BoardDomain> {
  constructor(
    @InjectRepository(BoardPersistence)
    private readonly boardRepository: Repository<BoardPersistence>,
  ) {
    super();
  }

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
    const plainBoard = domain.toPlain();

    return this.boardRepository.create({
      id: plainBoard.id,
      height: plainBoard.height,
      width: plainBoard.width,
      tiles: plainBoard.tiles.map((tile) => {
        const plainRoom = domain.rooms
          .getRoom({ coord: new CoordDomain(tile.coord) })
          ?.toPlain();

        return {
          id: tile.id,
          coord: tile.coord,
          playableEntities: [],
          interactiveEntities: tile.entities.filter(
            (entity): entity is ReturnType<TileInteractiveEntity["toPlain"]> =>
              entity.type === EntityType.INTERACTIVE_ENTITY,
          ),
          nonInteractiveEntities: tile.entities.filter(
            (
              entity,
            ): entity is ReturnType<TileNonInteractiveEntity["toPlain"]> =>
              entity.type === EntityType.NON_INTERACTIVE_ENTITY,
          ),
          isStartingTile: tile.isStartingTile,
          room: plainRoom
            ? {
                id: plainRoom.id,
                hasBeenVisited: plainRoom.hasBeenVisited,
                boundingBoxes: plainRoom.boundingBoxes as Array<
                  ReturnType<BoundingBox["toPlain"]>
                >,
              }
            : null,
        };
      }),
    });
  }
}
