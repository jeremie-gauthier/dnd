import type { Entity } from '../entity.interface';
import type { Character } from '../playables/characters/character.abstract';

export interface Interactive extends Entity {
  isVisible: boolean;
  canInteract: boolean;
  onInteraction: (entity: Character) => void;
}
