import { Injectable } from "@nestjs/common";
import { EventPayload } from "src/interfaces/event-payload.interface";
import { ChestTrapTriggeredPayload } from "src/modules/game/application/events/chest-trap-triggered.payload";
import { DoorOpenedPayload } from "src/modules/game/application/events/door-opened.payload";
import { EntityDiedPayload } from "src/modules/game/application/events/entity-died.payload";
import { GameWonPayload } from "src/modules/game/application/events/game-won.payload";
import { InitiativesRerolledPayload } from "src/modules/game/application/events/initiatives-rerolled.payload";
import { MonsterSpawnedPayload } from "src/modules/game/application/events/monster-spawned.payload";
import { PlayableEntityAttackedPayload } from "src/modules/game/application/events/playable-entity-attacked.payload";
import { PlayableEntityDrankPotionPayload } from "src/modules/game/application/events/playable-entity-drank-potion.payload";
import { PlayableEntityMovedPayload } from "src/modules/game/application/events/playable-entity-moved.payload";
import { PlayableEntityOpenedChestPayload } from "src/modules/game/application/events/playable-entity-opened-chest.payload";
import { PlayableEntityTookDamagePayload } from "src/modules/game/application/events/playable-entity-took-damage.payload";
import { PlayableEntityTurnEndedPayload } from "src/modules/game/application/events/playable-entity-turn-ended.payload";
import { PlayableEntityTurnStartedPayload } from "src/modules/game/application/events/playable-entity-turn-started.payload";
import { TrapTriggeredPayload } from "src/modules/game/application/events/trap-triggered.payload";
import { DomainEvent } from "../../domain/domain-events/domain-event.interface";
import { GameEvent } from "../../domain/domain-events/game-event.enum";
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
    [GameEvent.PlayableEntityDrankPotion]: PlayableEntityDrankPotionPayload,
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
