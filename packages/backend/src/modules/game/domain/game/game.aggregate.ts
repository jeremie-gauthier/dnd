import { AggregateRoot } from "src/modules/shared/domain/aggregate-root";
import { z } from "zod";
import { GameEvent } from "../../game-event/game-event.abstract";
import { Board } from "../board/board.entity";
import { GameMaster } from "../game-master/game-master.entity";
import { GameStatus } from "../game-status/game-status.vo";
import { MonsterTemplate } from "../monster-template/monster-template.vo";
import { Playable } from "../playable-entity/playable-entity.abstract";
import { Timeline } from "../timeline/timeline.entity";

type Data = {
  readonly id: string;
  status: GameStatus;
  board: Board;
  playableEntities: Array<Playable>;
  gameMaster: GameMaster;
  timeline: Timeline;
  monsterTemplates: Array<MonsterTemplate>;
  events: Array<GameEvent>;
};

export class Game extends AggregateRoot<Data> {
  private static schema = z.object({
    id: z.string().uuid(),
    status: z.instanceof(GameStatus),
    board: z.instanceof(Board),
    playableEntities: z.array(z.instanceof(Playable)),
    gameMaster: z.instanceof(GameMaster),
    timeline: z.instanceof(Timeline),
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
      playableEntities: this._data.playableEntities.map((playableEntity) =>
        playableEntity.toPlain(),
      ),
      gameMaster: this._data.gameMaster.toPlain(),
      timeline: this._data.timeline.toPlain(),
      monsterTemplates: this._data.monsterTemplates.map((monsterTemplate) =>
        monsterTemplate.toPlain(),
      ),
      events: this._data.events.map((event) => event.toPlain()),
    };
  }
}
