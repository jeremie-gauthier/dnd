import { Collection } from "src/interfaces/collection.interface";
import { AggregateRoot } from "src/modules/shared/domain/aggregate-root";
import { ArrayCollection } from "src/modules/shared/domain/collections/array.collection";
import { PlainData } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Coord } from "../common/coord/coord.vo";
import { PlayableEntityMovedDomainEvent } from "../domain-events/dtos/playable-entity-moved.dto";
import { Board } from "./board/board.entity";
import { Playable } from "./playable/playable.entity";
import { TilePlayableEntity } from "./tile/tile-entity/playable/playable.entity";

type Data = {
  gameId: string;
  board: Board;
  playableEntities: Collection<Playable>;
};

export class Move extends AggregateRoot<Data> {
  private static readonly schema = z.object({
    gameId: z.string().uuid(),
    board: z.instanceof(Board),
    playableEntities: z.instanceof(ArrayCollection<Playable>),
  });

  constructor(rawData: Data) {
    const data = Move.schema.parse(rawData);
    super(data);
  }

  //#region Getters

  public get gameId() {
    return this._data.gameId;
  }

  public get board() {
    return this._data.board;
  }

  public get playableEntities() {
    return this._data.playableEntities;
  }

  // #region Methods

  public movePlayableEntity({
    playableEntityId,
    destinationCoord,
  }: { playableEntityId: Playable["id"]; destinationCoord: Coord }) {
    this._data.board.mustBeAnAccessibleTile({ coord: destinationCoord });

    const playableEntity =
      this._data.playableEntities.getOneOrThrow(playableEntityId);

    const tileEntity = new TilePlayableEntity({
      id: playableEntity.id,
      isBlocking: true,
      faction: playableEntity.faction,
    });
    if (!playableEntity.coord.isUndefined()) {
      this._data.board.removeEntityAtCoord({
        tileEntity,
        coord: playableEntity.coord,
      });
    }

    this._data.board.addEntityAtCoord({ tileEntity, coord: destinationCoord });
    playableEntity.setCoord(destinationCoord);
  }

  public playerMove({
    userId,
    pathToTile,
  }: { pathToTile: Array<Coord>; userId: string }) {
    const playingEntity = this._data.playableEntities.getOneByOrThrow(
      (playable) => playable.isPlaying,
    );
    playingEntity.mustBePlayedBy({ userId });
    playingEntity.actMove();

    const path = pathToTile.map((coord) =>
      this._data.board.getTileOrThrow({ coord }),
    );
    const { validatedPath, trapTriggered } =
      playingEntity.moveBehaviour.getMovePath({
        self: playingEntity,
        path,
      });
    const destinationTile = validatedPath.at(-1);
    if (destinationTile) {
      this.movePlayableEntity({
        playableEntityId: playingEntity.id,
        destinationCoord: destinationTile.coord,
      });
      this.addDomainEvent(
        new PlayableEntityMovedDomainEvent({ playableEntity: playingEntity }),
      );
    }

    if (trapTriggered) {
      // TODO: addDomainEvents has walked on trap, send the trap but don't trigger it here
      // trapTriggered.onInteraction({ playableEntity: playingEntity });
      // this.addDomainEvents(trapTriggered.collectDomainEvents());
      // if (playingEntity.isDead) {
      //   this.endPlayerTurn({ userId });
      // }
    }
  }

  public override toPlain(): PlainData<Data> {
    return {} as any;
  }
}
