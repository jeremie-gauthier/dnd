import { GameEntity, PlayableEnemyEntity } from "@dnd/shared";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { GameEvent } from "./game-event.enum";

export class MonstersSpawnedPayload
  implements EventPayload<GameEvent.MonstersSpawned>
{
  public readonly name = GameEvent.MonstersSpawned;
  public readonly monsters: PlayableEnemyEntity[];
  public readonly game: GameEntity;

  constructor({ monsters, game }: Omit<MonstersSpawnedPayload, "name">) {
    this.monsters = monsters;
    this.game = game;
  }
}
