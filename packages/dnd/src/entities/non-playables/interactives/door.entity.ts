import {
  EntityEvent,
  entityEventEmitter,
} from '../../events/event-emitter.entity';
import { Character } from '../../playables/characters/character.abstract';
import { Interactive } from './interactive.abstract';

export class Door extends Interactive {
  public readonly name = 'Door';
  public readonly isPlayable = false;
  public isBlocking = true;
  public isVisible = true;
  public canInteract = true;

  public onInteraction(character: Character) {
    this.assertCanInteract(character);

    console.log(`${character.name} opened a ${this.type}`);
    this.isBlocking = false;
    this.canInteract = false;

    entityEventEmitter.emit(EntityEvent.OnDoorOpening, {
      door: this,
      character,
    });
  }

  public getRepresentation() {
    return `This is a Door`;
  }
}
