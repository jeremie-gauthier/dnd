import { Injectable } from "@nestjs/common";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { PlayableEntityTurnEndedPayload } from "src/modules/shared/events/game/playable-entity-turn-ended.payload";
import { PlayableEntityTurnStartedPayload } from "src/modules/shared/events/game/playable-entity-turn-started.payload";
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
    }
  }
}
