import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { DomainEvent } from "../../domain/domain-events/domain-event.interface";
import { Game } from "../../domain/game/game.aggregate";
import { DomainEventMapperService } from "./domain-event-mapper.service";

@Injectable()
export class DomainEventsDispatcherService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly domainEventMapperService: DomainEventMapperService,
  ) {}

  public dispatch({
    domainEvents,
    game,
  }: {
    domainEvents: Array<DomainEvent>;
    game: ReturnType<Game["toPlain"]>;
  }) {
    for (const domainEvent of domainEvents) {
      const integrationEvent =
        this.domainEventMapperService.mapDomainEventToApplicationEvent({
          domainEvent,
          game,
        });
      this.eventEmitter.emitAsync(integrationEvent.name, integrationEvent);
    }
  }
}
