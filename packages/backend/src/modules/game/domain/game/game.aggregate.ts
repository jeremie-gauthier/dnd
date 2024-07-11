import { AggregateRoot } from "src/modules/shared/domain/aggregate-root";
import { z } from "zod";
import { Board } from "../board/board.entity";
import { Coord } from "../coord/coord.vo";
import { GameEvent } from "../game-event/game-event.abstract";
import { GameMaster } from "../game-master/game-master.entity";
import { GameStatus } from "../game-status/game-status.vo";
import { MonsterTemplate } from "../monster-template/monster-template.vo";
import { PlayableEntities } from "../playable-entities/playable-entities.aggregate";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { TilePlayableEntity } from "../tile/tile-entity/playable/playable.entity";

type Data = {
  readonly id: string;
  status: GameStatus;
  board: Board;
  playableEntities: PlayableEntities;
  gameMaster: GameMaster;
  monsterTemplates: Array<MonsterTemplate>;
  events: Array<GameEvent>;
};

export class Game extends AggregateRoot<Data> {
  private static schema = z.object({
    id: z.string().uuid(),
    status: z.instanceof(GameStatus),
    board: z.instanceof(Board),
    playableEntities: z.instanceof(PlayableEntities),
    gameMaster: z.instanceof(GameMaster),
    monsterTemplates: z.array(z.instanceof(MonsterTemplate)),
    events: z.array(z.instanceof(GameEvent)),
  });

  constructor(rawData: Data) {
    const data = Game.schema.parse(rawData);
    super(data, data.id);
  }

  public toPlain() {
    return {
      id: this._data.id,
      status: this._data.status.toPlain(),
      board: this._data.board.toPlain(),
      playableEntities: this._data.playableEntities.toPlain(),
      gameMaster: this._data.gameMaster.toPlain(),
      monsterTemplates: this._data.monsterTemplates.map((monsterTemplate) =>
        monsterTemplate.toPlain(),
      ),
      events: this._data.events.map((event) => event.toPlain()),
    };
  }

  public endPlayerTurn({ userId }: { userId: string }) {
    const playingEntity = this._data.playableEntities.getPlayingEntityOrThrow();
    playingEntity.mustBePlayedBy({ userId });
    const nextEntityToPlay = this._data.playableEntities.getNextEntityToPlay();

    playingEntity.endTurn();
    nextEntityToPlay?.startTurn();

    return {
      playingEntityWhoseTurnEnded: playingEntity,
      playingEntityWhoseTurnStarted: nextEntityToPlay,
    };
  }

  public movePlayableEntity({
    playableEntityId,
    destinationCoord,
  }: { playableEntityId: Playable["id"]; destinationCoord: Coord }) {
    const playableEntity = this._data.playableEntities.getOneOrThrow({
      playableEntityId,
    });

    const tileEntity = new TilePlayableEntity({ id: playableEntity.id });
    if (!playableEntity.coord.isUndefined()) {
      this._data.board.removeEntityAtCoord({
        tileEntity,
        coord: playableEntity.coord,
      });
    }

    this._data.board.addEntityAtCoord({ tileEntity, coord: destinationCoord });
    playableEntity.setCoord(destinationCoord);
  }

  public rollInitiatives() {
    this._data.playableEntities.rollInitiatives();
  }
}
