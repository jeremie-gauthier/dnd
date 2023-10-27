export type CharacterClass = 'warrior' | 'cleric' | 'sorcerer' | 'thief';

export type SpellCaster = Extract<CharacterClass, 'cleric' | 'sorcerer'>;
