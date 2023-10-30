import EventEmitter from 'node:events';
import type TypedEmitter from 'typed-emitter';
import type { ToHandlers } from '../../interfaces/message-event-handler.type';
import type { Chest } from '../interactives/chest.entity';
import type { Door } from '../interactives/door.entity';
import type { Character } from '../playables/characters/character.abstract';
import type { PlayableEntity } from '../playables/playable.abstract';

export enum EntityEvent {
  OnEntityDeath = 'on_entity_death',
  OnDoorOpening = 'on_door_opening',
  OnChestOpening = 'on_chest_opening',
}

export interface EntityInputByEventName {
  [EntityEvent.OnEntityDeath]: { deadEntity: PlayableEntity };
  [EntityEvent.OnDoorOpening]: { door: Door; character: Character };
  [EntityEvent.OnChestOpening]: { chest: Chest; character: Character };
}

export type EntityEventEmitter = TypedEmitter<
  ToHandlers<EntityInputByEventName>
>;

export const entityEventEmitter = new EventEmitter() as EntityEventEmitter;
