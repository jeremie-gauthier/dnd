import type { SpellCasterCharacter } from '../../../interfaces/character-class.type';
import type { Spell } from '../../../items/spells/spell.abstract';
import { CannotCastSpellError } from '../errors/cannot-cast-spell-error';
import { NotACharacterError } from '../errors/not-a-character-error';
import { NotEnoughManaError } from '../errors/not-enough-mana-error';
import type { PlayableEntity } from '../playable.abstract';

export function assertCharacterCanCastSpell(
  playableEntity: PlayableEntity,
  item: Spell,
): asserts playableEntity is SpellCasterCharacter {
  assertIsASpellCasterCharacter(playableEntity);
  assertHasEnoughMana(playableEntity, item);
}

function assertIsASpellCasterCharacter(
  playableEntity: PlayableEntity,
): asserts playableEntity is SpellCasterCharacter {
  if (!playableEntity.isCharacter()) {
    throw new NotACharacterError();
  }

  if (!playableEntity.isSpellCaster()) {
    throw new CannotCastSpellError(playableEntity.class);
  }
}

function assertHasEnoughMana(
  playableEntity: SpellCasterCharacter,
  item: Spell,
) {
  const manaCost = item.manaCost[playableEntity.class];
  if (playableEntity.manaPoints < manaCost) {
    throw new NotEnoughManaError(playableEntity, item);
  }
}
