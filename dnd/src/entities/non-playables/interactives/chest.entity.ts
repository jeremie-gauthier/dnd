import {
  EntityEvent,
  entityEventEmitter,
} from '../../events/event-emitter.entity';
import { Character } from '../../playables/characters/character.abstract';
import { Interactive } from './interactive.abstract';

export class Chest extends Interactive {
  public readonly name = 'Chest';
  public readonly type = 'chest';
  public readonly isPlayable = false;
  public readonly isBlocking = true;
  public isVisible = true;
  public isInteractive = true;

  public onInteraction(character: Character) {
    this.assertCanInteract(character);

    console.log(`${character.name} opened a ${this.type}`);

    // draw a loot

    entityEventEmitter.emit(EntityEvent.OnChestOpening, {
      chest: this,
      character,
    });
  }

  public drawLoot() {
    throw new Error('Not implemented.');
  }

  public loot() {
    throw new Error('Not implemented.');
  }

  public equip() {
    throw new Error('Not implemented.');
  }

  private trapTriggered() {
    throw new Error('Not implemented.');
  }
}
