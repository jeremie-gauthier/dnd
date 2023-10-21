import { Character } from '../characters/character.interface';
import type { Entity } from '../entity.interface';

export interface Interactive extends Entity {
  isVisible: boolean;
  canInteract: boolean;
  // TODO: replace type entity by the class
  onInteraction: (entity: Character) => void;
}
