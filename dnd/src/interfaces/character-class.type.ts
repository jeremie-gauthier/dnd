import type { Character } from '../entities/playables/characters/character.abstract';

export type CharacterClass = 'warrior' | 'cleric' | 'sorcerer' | 'thief';

export type SpellCaster = Extract<CharacterClass, 'cleric' | 'sorcerer'>;

export type SpellCasterCharacter = Character & { class: SpellCaster };
