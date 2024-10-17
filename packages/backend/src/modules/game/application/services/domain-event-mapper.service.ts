import { Injectable } from "@nestjs/common";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { DoorOpenedPayload } from "src/modules/shared/events/game/door-opened.payload";
import { EntityDiedPayload } from "src/modules/shared/events/game/entity-died.payload";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { InitiativesRerolledPayload } from "src/modules/shared/events/game/initiatives-rerolled.payload";
import { MonsterSpawnedPayload } from "src/modules/shared/events/game/monster-spawned.payload";
import { PlayableEntityMovedPayload } from "src/modules/shared/events/game/playable-entity-moved.payload";
import { PlayableEntityTurnEndedPayload } from "src/modules/shared/events/game/playable-entity-turn-ended.payload";
import { PlayableEntityTurnStartedPayload } from "src/modules/shared/events/game/playable-entity-turn-started.payload";
import { TrapTriggeredPayload } from "src/modules/shared/events/game/trap-triggered.payload";
import { DomainEvent } from "../../domain/domain-events/domain-event.interface";
import { Game } from "../../domain/game/game.aggregate";

@Injectable()
export class DomainEventMapperService {
  public mapDomainEventToApplicationEvent({
    domainEvent,
    game,
  }: {
    domainEvent: DomainEvent;
    game: ReturnType<Game["toPlain"]>;
  }): EventPayload<GameEvent> {
    switch (domainEvent.name) {
      case GameEvent.PlayableEntityTurnEnded:
        return new PlayableEntityTurnEndedPayload({ ...domainEvent, game });
      case GameEvent.PlayableEntityTurnStarted:
        return new PlayableEntityTurnStartedPayload({ ...domainEvent, game });
      case GameEvent.PlayableEntityMoved:
        return new PlayableEntityMovedPayload({ ...domainEvent, game });
      case GameEvent.TrapTriggered:
        return new TrapTriggeredPayload({ ...domainEvent, game });
      case GameEvent.EntityDied:
        return new EntityDiedPayload({ ...domainEvent, game });
      case GameEvent.MonsterSpawned:
        return new MonsterSpawnedPayload({ ...domainEvent, game });
      case GameEvent.DoorOpened:
        return new DoorOpenedPayload({ ...domainEvent, game });
      case GameEvent.InitiativesRerolled:
        return new InitiativesRerolledPayload({ ...domainEvent, game });
    }
  }
}
