import EventEmitter from 'node:events';
import type TypedEmitter from 'typed-emitter';
import type { ToHandlers } from '../../interfaces/message-event-handler.type';
import type { Tile } from '../../map/tile';
import type { Chest } from '../non-playables/interactives/chest.entity';
import type { Door } from '../non-playables/interactives/door.entity';
import type { Trap } from '../non-playables/interactives/trap.entity';
import type { Character } from '../playables/characters/character.abstract';
import type { PlayableEntity } from '../playables/playable.abstract';

export enum EntityEvent {
  OnEntityDeath = 'on_entity_death',
  OnDoorOpening = 'on_door_opening',
  OnChestOpening = 'on_chest_opening',
  OnEntityMove = 'on_entity_move',
  // TODO: should change the player status from MOVING to CHOOSING_ACTION
  OnTrapTriggered = 'on_trap_triggered',
}

export interface EntityInputByEventName {
  [EntityEvent.OnEntityDeath]: { deadEntity: PlayableEntity };
  [EntityEvent.OnDoorOpening]: { door: Door; character: Character };
  [EntityEvent.OnChestOpening]: { chest: Chest; character: Character };
  [EntityEvent.OnEntityMove]: { entity: PlayableEntity; tile: Tile };
  [EntityEvent.OnTrapTriggered]: {
    entity: PlayableEntity;
    tile: Tile;
    trap: Trap;
  };
}

export type EntityEventEmitter = TypedEmitter<
  ToHandlers<EntityInputByEventName>
>;

export const entityEventEmitter = new EventEmitter() as EntityEventEmitter;
