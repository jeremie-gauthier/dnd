import type { SpellCasterCharacter } from '../../../interfaces/character-class.type';
import type { Spell } from '../../../items/spells/spell.abstract';
import { PlayableEntityError } from './playable-entity-error';

export class NotEnoughManaError extends PlayableEntityError {
  constructor(character: SpellCasterCharacter, spell: Spell) {
    const manaCost = spell.manaCost[character.class];
    super(
      `Not enough mana to cast ${spell.name} (${spell.type}). Player got ${character.manaPoints} while it takes ${manaCost} to cast`,
    );
    this.name = 'NotEnoughManaError';
  }
}
