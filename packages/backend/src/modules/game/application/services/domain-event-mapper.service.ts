import { Injectable } from "@nestjs/common";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { ChestTrapTriggeredPayload } from "src/modules/shared/events/game/chest-trap-triggered.payload";
import { DoorOpenedPayload } from "src/modules/shared/events/game/door-opened.payload";
import { EntityDiedPayload } from "src/modules/shared/events/game/entity-died.payload";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { GameWonPayload } from "src/modules/shared/events/game/game-won.payload";
import { InitiativesRerolledPayload } from "src/modules/shared/events/game/initiatives-rerolled.payload";
import { MonsterSpawnedPayload } from "src/modules/shared/events/game/monster-spawned.payload";
import { PlayableEntityAttackedPayload } from "src/modules/shared/events/game/playable-entity-attacked.payload";
import { PlayableEntityMovedPayload } from "src/modules/shared/events/game/playable-entity-moved.payload";
import { PlayableEntityOpenedChestPayload } from "src/modules/shared/events/game/playable-entity-opened-chest.payload";
import { PlayableEntityTookDamagePayload } from "src/modules/shared/events/game/playable-entity-took-damage.payload";
import { PlayableEntityTurnEndedPayload } from "src/modules/shared/events/game/playable-entity-turn-ended.payload";
import { PlayableEntityTurnStartedPayload } from "src/modules/shared/events/game/playable-entity-turn-started.payload";
import { TrapTriggeredPayload } from "src/modules/shared/events/game/trap-triggered.payload";
import { DomainEvent } from "../../domain/domain-events/domain-event.interface";
import { Game } from "../../domain/game/game.aggregate";

@Injectable()
export class DomainEventMapperService {
  private static readonly eventMapper = {
    [GameEvent.PlayableEntityTurnEnded]: PlayableEntityTurnEndedPayload,
    [GameEvent.PlayableEntityTurnStarted]: PlayableEntityTurnStartedPayload,
    [GameEvent.PlayableEntityMoved]: PlayableEntityMovedPayload,
    [GameEvent.TrapTriggered]: TrapTriggeredPayload,
    [GameEvent.EntityDied]: EntityDiedPayload,
    [GameEvent.MonsterSpawned]: MonsterSpawnedPayload,
    [GameEvent.DoorOpened]: DoorOpenedPayload,
    [GameEvent.InitiativesRerolled]: InitiativesRerolledPayload,
    [GameEvent.PlayableEntityAttacked]: PlayableEntityAttackedPayload,
    [GameEvent.PlayableEntityTookDamage]: PlayableEntityTookDamagePayload,
    [GameEvent.GameWon]: GameWonPayload,
    [GameEvent.ChestTrapTriggered]: ChestTrapTriggeredPayload,
    [GameEvent.PlayableEntityOpenedChest]: PlayableEntityOpenedChestPayload,
  };

  public mapDomainEventToApplicationEvent({
    domainEvent,
    game,
  }: {
    domainEvent: DomainEvent;
    game: ReturnType<Game["toPlain"]>;
  }): EventPayload<GameEvent> {
    const ApplicationEvent =
      DomainEventMapperService.eventMapper[domainEvent.name];
    if (!ApplicationEvent) {
      throw new Error(`No integration event "${domainEvent.name}" found`);
    }

    return new ApplicationEvent({ ...domainEvent, game } as any);
  }
}
