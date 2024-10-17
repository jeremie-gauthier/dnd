import { IDomainEvent } from "src/modules/shared/domain/domain-event.interface";
import { Monster } from "../../playable-entities/playable-entity/monster.entity";
import { GameEvent } from "../game-event.enum";

export class MonsterSpawnedDomainEvent
  implements IDomainEvent<GameEvent.MonsterSpawned>
{
  public readonly name = GameEvent.MonsterSpawned;
  public readonly monster: ReturnType<Monster["toPlain"]>;

  constructor({ monster }: Omit<MonsterSpawnedDomainEvent, "name">) {
    this.monster = monster;
  }
}
