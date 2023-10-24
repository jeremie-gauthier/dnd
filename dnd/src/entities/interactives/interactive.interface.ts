import type { Character } from '../characters/character.interface';
import type { Entity } from '../entity.interface';

export interface Interactive extends Entity {
  isVisible: boolean;
  canInteract: boolean;
  onInteraction: (entity: Character) => void;
}
