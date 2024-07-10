import { EventPayload } from "src/interfaces/event-payload.interface";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Monster } from "src/modules/game/domain/playable-entities/playable-entity/monster.entity";
import { GameEvent } from "./game-event.enum";

export class MonstersSpawnedPayload
  implements EventPayload<GameEvent.MonstersSpawned>
{
  public readonly name = GameEvent.MonstersSpawned;
  public readonly monsters: Array<ReturnType<Monster["toPlain"]>>;
  public readonly game: ReturnType<Game["toPlain"]>;

  constructor({ monsters, game }: Omit<MonstersSpawnedPayload, "name">) {
    this.monsters = monsters;
    this.game = game;
  }
}
