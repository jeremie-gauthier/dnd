import { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Monster } from "src/modules/game/domain/playable-entities/playable-entity/monster.entity";
import { GameEvent } from "./game-event.enum";

export class MonsterSpawnedPayload
  implements EventPayload<GameEvent.MonsterSpawned>
{
  public readonly name = GameEvent.MonsterSpawned;
  public readonly monster: ReturnType<Monster["toPlain"]>;
  public readonly game: ReturnType<Game["toPlain"]>;

  constructor({ monster, game }: Omit<MonsterSpawnedPayload, "name">) {
    this.monster = monster;
    this.game = game;
  }
}
