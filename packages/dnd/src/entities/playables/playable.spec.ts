import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MOCK_EXPECTED_DICE_ROLL } from '../../dices/fixtures/dice.fixture';
import { AttackResult } from '../../interfaces/attack-result.type';
import { AttackType } from '../../interfaces/attack-type.enum';
import {
  SpellCaster,
  SpellCasterCharacter,
} from '../../interfaces/character-class.type';
import { MockSpell } from '../../items/spells/fixtures/spell.fixture';
import {
  DICES_ROLL_SUM,
  MockWeapon,
} from '../../items/weapons/fixtures/weapon.fixture';
import { Coord } from '../../map/coord';
import { Tile } from '../../map/tile';
import {
  MockSorcererCharacter,
  MockWarriorCharacter,
} from './characters/fixtures/playable.fixture';
import { CannotCastSpellError } from './errors/cannot-cast-spell-error';
import { CannotMeleeAttackError } from './errors/cannot-melee-attack-error';
import { CannotRangeAttackError } from './errors/cannot-range-attack-error';
import { NotACharacterError } from './errors/not-a-character-error';
import { NotEnoughManaError } from './errors/not-enough-mana-error';
import { NotEquippedError } from './errors/not-equipped-error';
import { NotInSightError } from './errors/not-in-sight-error';
import {
  HP_LEFT_AFTER_ONE_ATTACK_WITHOUT_ARMOR_CLASS,
  HP_LEFT_AFTER_ONE_ATTACK_WITH_ARMOR_CLASS,
  MOCK_CHARACTER_HP,
  MOCK_DAMAGES,
  MockCharacterEntity,
  MockEnemyEntity,
} from './fixtures/playable.fixture';
import { PlayableEntity } from './playable.abstract';

describe('entities: PlayableEntity', () => {
  const coord = Coord.from({ x: 0, y: 0 });
  let playableEntity: PlayableEntity;

  beforeEach(() => {
    playableEntity = new MockCharacterEntity(coord);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getter: isAlive', () => {
    it('should returns true when the entity HP is greater than 0', () => {
      const result = playableEntity.isAlive;
      const expected = true;

      expect(result).toEqual(expected);
    });

    it('should returns true when the entity HP is lower than or equals 0', () => {
      playableEntity.healthPoints = 0;

      const result = playableEntity.isAlive;
      const expected = false;

      expect(result).toEqual(expected);
    });
  });

  describe('method: takeDamage', () => {
    it('should minus the HP value when attack is greater than armor class', () => {
      const DAMAGES = MOCK_DAMAGES;
      playableEntity.takeDamage(DAMAGES);

      const result = playableEntity.healthPoints;
      const expected = HP_LEFT_AFTER_ONE_ATTACK_WITH_ARMOR_CLASS;

      expect(result).toEqual(expected);
    });

    it('should do nothing when the attack is lower than or equals to the armor class', () => {
      {
        const DAMAGES = 2;
        playableEntity.takeDamage(DAMAGES);

        const result = playableEntity.healthPoints;
        const expected = MOCK_CHARACTER_HP;

        expect(result).toEqual(expected);
      }

      {
        const DAMAGES = 1;
        playableEntity.takeDamage(DAMAGES);

        const result = playableEntity.healthPoints;
        const expected = MOCK_CHARACTER_HP;

        expect(result).toEqual(expected);
      }

      {
        const DAMAGES = -2;
        playableEntity.takeDamage(DAMAGES);

        const result = playableEntity.healthPoints;
        const expected = MOCK_CHARACTER_HP;

        expect(result).toEqual(expected);
      }
    });

    it('should updates values when entity die', () => {
      const DAMAGES = 42;
      playableEntity.takeDamage(DAMAGES);

      expect(playableEntity.healthPoints).toEqual(0);
      expect(playableEntity.isBlocking).toEqual(false);
    });
  });

  describe('method: takeDirectDamage', () => {
    it('should minus the HP value and ignore the armor class', () => {
      const DAMAGES = MOCK_DAMAGES;
      playableEntity.takeDirectDamage(DAMAGES);

      const result = playableEntity.healthPoints;
      const expected = HP_LEFT_AFTER_ONE_ATTACK_WITHOUT_ARMOR_CLASS;

      expect(result).toEqual(expected);
    });
  });

  describe('method: initiativeRoll', () => {
    it('should updates `initiative` by a random value', () => {
      const spy = vi.spyOn(Math, 'random').mockImplementation(() => 1);

      expect(playableEntity.initiative).toEqual(0);

      playableEntity.initiativeRoll();
      const expected = 100;

      expect(spy).toHaveBeenCalled();
      expect(playableEntity.initiative).toEqual(expected);
    });
  });

  describe('method: isCharacter', () => {
    it("should returns true if the playable entity type is 'character'", () => {
      const result = playableEntity.isCharacter();
      const expected = true;

      expect(result).toEqual(expected);
    });

    it("should returns true if the playable entity type is not 'character'", () => {
      const playableEntity = new MockEnemyEntity(coord);

      const result = playableEntity.isCharacter();
      const expected = false;

      expect(result).toEqual(expected);
    });
  });

  describe('method: isEnemy', () => {
    it("should returns true if the playable entity type is 'enemy'", () => {
      const playableEntity = new MockEnemyEntity(coord);

      const result = playableEntity.isEnemy();
      const expected = true;

      expect(result).toEqual(expected);
    });

    it("should returns true if the playable entity type is not 'enemy'", () => {
      const result = playableEntity.isEnemy();
      const expected = false;

      expect(result).toEqual(expected);
    });
  });

  describe('method: attack', () => {
    const enemyEntityCoord = Coord.from({ ...coord, y: coord.y + 1 });
    const tilesInSight = [new Tile(enemyEntityCoord)];

    it("should updates the target's values and returns the attack results", () => {
      const enemyEntity = new MockEnemyEntity(enemyEntityCoord);
      const weapon = new MockWeapon();
      playableEntity.inventory.addItemInBag(
        weapon,
        playableEntity.inventory.equipped.weapon,
      );

      const result = playableEntity.attack(weapon, enemyEntity, tilesInSight);
      const expected: AttackResult = [
        DICES_ROLL_SUM,
        [MOCK_EXPECTED_DICE_ROLL, MOCK_EXPECTED_DICE_ROLL],
      ];

      expect(result).toEqual(expected);

      const expectedEnemyHPLeft =
        enemyEntity.healthPointsNatural -
        (DICES_ROLL_SUM - enemyEntity.armorClass);
      expect(enemyEntity.healthPoints).toEqual(expectedEnemyHPLeft);
    });

    it('should throws when attacking with an item that is not equipped', () => {
      const enemyEntity = new MockEnemyEntity(enemyEntityCoord);
      const weapon = new MockWeapon();

      const result = () =>
        playableEntity.attack(weapon, enemyEntity, tilesInSight);
      const expected = new NotEquippedError(weapon).message;

      expect(result).toThrowError(expected);
    });

    it('should throws when attacking a target that is not in sight', () => {
      const enemyEntity = new MockEnemyEntity(enemyEntityCoord);
      const weapon = new MockWeapon();
      playableEntity.inventory.addItemInBag(
        weapon,
        playableEntity.inventory.equipped.weapon,
      );

      const result = () => playableEntity.attack(weapon, enemyEntity, []);
      const expected = new NotInSightError(enemyEntity).message;

      expect(result).toThrowError(expected);
    });

    it('should throws when attacking a range target with a melee item', () => {
      const enemyEntityCoord = Coord.from({ ...coord, y: coord.y + 2 });
      const enemyEntity = new MockEnemyEntity(enemyEntityCoord);
      const weapon = new MockWeapon();
      playableEntity.inventory.addItemInBag(
        weapon,
        playableEntity.inventory.equipped.weapon,
      );

      const result = () =>
        playableEntity.attack(weapon, enemyEntity, [
          new Tile(enemyEntityCoord),
          ...tilesInSight,
        ]);
      const expected = new CannotMeleeAttackError().message;

      expect(result).toThrowError(expected);
    });

    it('should throws when attacking a melee target with a range item', () => {
      const enemyEntity = new MockEnemyEntity(enemyEntityCoord);
      const weapon = new MockWeapon();
      weapon.attackType = AttackType.Range;
      playableEntity.inventory.addItemInBag(
        weapon,
        playableEntity.inventory.equipped.weapon,
      );

      const result = () =>
        playableEntity.attack(weapon, enemyEntity, [
          new Tile(enemyEntityCoord),
          ...tilesInSight,
        ]);
      const expected = new CannotRangeAttackError().message;

      expect(result).toThrowError(expected);
    });

    it('should drains mana when attacking with a spell', () => {
      const character = new MockSorcererCharacter(coord);
      const enemyEntityCoord = Coord.from({ ...coord, y: coord.y + 2 });
      const enemyEntity = new MockEnemyEntity(enemyEntityCoord);

      const spell = new MockSpell();
      character.inventory.addItemInBag(
        spell,
        character.inventory.equipped.spell,
      );

      const result = character.attack(spell, enemyEntity, [
        new Tile(enemyEntityCoord),
        ...tilesInSight,
      ]);
      const expected: AttackResult = [
        DICES_ROLL_SUM,
        [MOCK_EXPECTED_DICE_ROLL, MOCK_EXPECTED_DICE_ROLL],
      ];

      expect(result).toEqual(expected);
      const expectedManaPointsLeft =
        character.manaPointsNatural -
        spell.getManaCost(character.class as SpellCaster);
      expect(character.manaPoints).toEqual(expectedManaPointsLeft);
    });

    it('should throws when spell caster is not a character', () => {
      const character = new MockEnemyEntity(coord);
      const enemyEntityCoord = Coord.from({ ...coord, y: coord.y + 2 });
      const enemyEntity = new MockEnemyEntity(enemyEntityCoord);

      const spell = new MockSpell();
      character.inventory.addItemInBag(
        spell,
        character.inventory.equipped.spell,
      );

      const result = () =>
        character.attack(spell, enemyEntity, [
          new Tile(enemyEntityCoord),
          ...tilesInSight,
        ]);
      const expected = new NotACharacterError().message;

      expect(result).toThrowError(expected);
    });

    it('should throws when spell caster does not have enough mana', () => {
      const character = new MockSorcererCharacter(coord);
      const enemyEntityCoord = Coord.from({ ...coord, y: coord.y + 2 });
      const enemyEntity = new MockEnemyEntity(enemyEntityCoord);

      character.manaPoints = 2;

      const spell = new MockSpell();
      character.inventory.addItemInBag(
        spell,
        character.inventory.equipped.spell,
      );

      const result = () =>
        character.attack(spell, enemyEntity, [
          new Tile(enemyEntityCoord),
          ...tilesInSight,
        ]);
      const expected = new NotEnoughManaError(
        character as SpellCasterCharacter,
        spell,
      ).message;

      expect(result).toThrowError(expected);
    });

    it('should throws when character attacking with spell is not a spell caster', () => {
      const character = new MockWarriorCharacter(coord);
      const enemyEntityCoord = Coord.from({ ...coord, y: coord.y + 2 });
      const enemyEntity = new MockEnemyEntity(enemyEntityCoord);

      const spell = new MockSpell();
      character.inventory.addItemInBag(
        spell,
        character.inventory.equipped.spell,
      );

      const result = () =>
        character.attack(spell, enemyEntity, [
          new Tile(enemyEntityCoord),
          ...tilesInSight,
        ]);
      const expected = new CannotCastSpellError(character.class).message;

      expect(result).toThrowError(expected);
    });
  });
});
