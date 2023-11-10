import { AttackType } from '../../../interfaces/attack-type.enum';
import type { Spell } from '../../../items/spells/spell.abstract';
import type { Weapon } from '../../../items/weapons/weapon.abstract';
import type { Tile } from '../../../map/tile';
import { CannotMeleeAttackError } from '../errors/cannot-melee-attack-error';
import { CannotRangeAttackError } from '../errors/cannot-range-attack-error';
import { NotEquippedError } from '../errors/not-equipped-error';
import { NotInSightError } from '../errors/not-in-sight-error';
import type { PlayableEntity } from '../playable.abstract';

export function assertCanAttackTarget(
  attacker: PlayableEntity,
  target: PlayableEntity,
  item: Weapon | Spell,
  tilesInSight: Tile[],
) {
  assertItemIsEquipped(attacker, item);
  assertTargetInSight(attacker, target, item, tilesInSight);
}

function assertItemIsEquipped(attacker: PlayableEntity, item: Weapon | Spell) {
  if (!attacker.inventory.isItemEquipped(item)) {
    throw new NotEquippedError(item);
  }
}

function assertTargetInSight(
  attacker: PlayableEntity,
  target: PlayableEntity,
  item: Weapon | Spell,
  tilesInSight: Tile[],
) {
  if (!tilesInSight.some((tile) => tile.coord.equals(target.coord))) {
    throw new NotInSightError(target);
  }

  if (
    item.attackType === AttackType.Melee &&
    !attacker.coord.isNextTo(target.coord)
  ) {
    throw new CannotMeleeAttackError();
  }

  if (
    item.attackType === AttackType.Range &&
    attacker.coord.isNextTo(target.coord)
  ) {
    throw new CannotRangeAttackError();
  }
}
