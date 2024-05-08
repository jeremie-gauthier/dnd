import { GameEntity, PlayableEnemyEntity } from "@dnd/shared";
import { EventPayload } from "src/event-emitter/event-payload.class";
import { GameEvent } from "./game-events.enum";

export class EnemiesSpawnedPayload
  implements EventPayload<GameEvent.EnemiesSpawned>
{
  public readonly name = GameEvent.EnemiesSpawned;
  public readonly enemies: PlayableEnemyEntity[];
  public readonly game: GameEntity;

  constructor({ enemies, game }: Omit<EnemiesSpawnedPayload, "name">) {
    this.enemies = enemies;
    this.game = game;
  }
}
