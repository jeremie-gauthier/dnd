import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { Monster } from "../../playable-entities/playable-entity/monster.entity";

export class MonsterSpawnedDomainEvent
  implements IDomainEvent<GameEvent.MonsterSpawned>
{
  public readonly name = GameEvent.MonsterSpawned;
  public readonly monster: ReturnType<Monster["toPlain"]>;

  constructor({ monster }: Omit<MonsterSpawnedDomainEvent, "name">) {
    this.monster = monster;
  }
}
