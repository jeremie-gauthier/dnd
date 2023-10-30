import EventEmitter from 'node:events';
import type TypedEmitter from 'typed-emitter';
import type { ToHandlers } from '../../interfaces/message-event-handler.type';
import type { PlayableEntity } from '../playables/playable.abstract';

export enum EntityEvent {
  OnEntityDeath = 'on_entity_death',
}

export interface EntityInputByEventName {
  [EntityEvent.OnEntityDeath]: { deadEntity: PlayableEntity };
}

export type EntityEventEmitter = TypedEmitter<
  ToHandlers<EntityInputByEventName>
>;

export const entityEventEmitter = new EventEmitter() as EntityEventEmitter;
