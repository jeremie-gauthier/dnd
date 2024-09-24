import { randomUUID } from "node:crypto";
import {
  AttackRangeType,
  HeroClassType,
  ItemManaCostJson,
  PerkNameType,
} from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { parse } from "csv-parse/sync";
import { UseCase } from "src/interfaces/use-case.interface";
import { Attack } from "src/modules/game/domain/attack/attack.entity";
import { Dice } from "src/modules/game/domain/dice/dice.vo";
import { Artifact } from "src/modules/game/domain/item/artifact/artifact.abstract";
import { ChestTrap } from "src/modules/game/domain/item/chest-trap/chest-trap.abstract";
import { Item } from "src/modules/game/domain/item/item.abstract";
import { Potion } from "src/modules/game/domain/item/potion/potion.abstract";
import { Spell } from "src/modules/game/domain/item/spell/spell.entity";
import { Weapon } from "src/modules/game/domain/item/weapon/weapon.entity";
import { ArtifactFactory } from "../../factories/artifact.factory";
import { ChestTrapFactory } from "../../factories/chest-trap.factory";
import { PerkFactory } from "../../factories/perk.factory";
import { PotionFactory } from "../../factories/potion.factory";
import {
  DICE_REPOSITORY,
  DiceRepository,
} from "../../repositories/dice-repository.interface";
import {
  ITEM_DEV_REPOSITORY,
  ItemDevRepository,
} from "../../repositories/item-dev-repository.interface";
import {
  ITEM_UI_REPOSITORY,
  ItemUIRepository,
} from "../../repositories/item-ui-repository.interface";
import { CsvItemRecord } from "./csv-item-record.interface";

@Injectable()
export class CreateItemsFromCsvUseCase implements UseCase {
  constructor(
    @Inject(ITEM_DEV_REPOSITORY)
    private readonly itemDevRepository: ItemDevRepository,
    @Inject(ITEM_UI_REPOSITORY)
    private readonly itemUIRepository: ItemUIRepository,
    @Inject(DICE_REPOSITORY)
    private readonly diceRepository: DiceRepository,
  ) {}

  public async execute({ file }: { file: Express.Multer.File }): Promise<void> {
    const records: Array<CsvItemRecord> = parse(file.buffer, {
      columns: true,
      skipEmptyLines: true,
      cast: true,
    });
    const dices = await this.diceRepository.getAll();

    const items = records.map((record) =>
      this.createItemFromCsvRecord({ record, dices }),
    );
    const itemsUI = items.map(({ record }) => ({
      itemName: record.item_id,
      imgUrl: `https://jergauth-dnd-assets.s3.eu-west-3.amazonaws.com/${record.item_id}.webp`,
    }));

    await this.itemDevRepository.createMany({ items });
    await this.itemUIRepository.createMany({ items: itemsUI });
  }

  private createItemFromCsvRecord({
    record,
    dices,
  }: { record: CsvItemRecord; dices: Array<Dice> }): {
    record: CsvItemRecord;
    item: Item;
  } {
    switch (record.item_type) {
      case "artifact":
        return this.createArtifactFromCsvRecord({ record });
      case "potion":
        return this.createPotionFromCsvRecord({ record });
      case "spell":
        return this.createSpellFromCsvRecord({ record, dices });
      case "trap":
        return this.createChestTrapFromCsvRecord({ record });
      case "weapon":
        return this.createWeaponFromCsvRecord({ record, dices });
      default:
        throw new Error(`"${record.item_type}" is not a supported item type`);
    }
  }

  private createArtifactFromCsvRecord({ record }: { record: CsvItemRecord }): {
    record: CsvItemRecord;
    item: Artifact;
  } {
    const item = ArtifactFactory.create(record.item_id);

    return { record, item };
  }

  private createPotionFromCsvRecord({ record }: { record: CsvItemRecord }): {
    record: CsvItemRecord;
    item: Potion;
  } {
    const item = PotionFactory.create(record.item_id);

    return { record, item };
  }

  private createChestTrapFromCsvRecord({ record }: { record: CsvItemRecord }): {
    record: CsvItemRecord;
    item: ChestTrap;
  } {
    const item = ChestTrapFactory.create(record.item_id);

    return { record, item };
  }

  private createSpellFromCsvRecord({
    record,
    dices,
  }: { record: CsvItemRecord; dices: Array<Dice> }): {
    record: CsvItemRecord;
    item: Spell;
  } {
    const regularAttack =
      record.regular_attack_dices !== ""
        ? new Attack({
            id: randomUUID(),
            dices: this.createDicesFromCsvColumn({
              encodedDices: record.regular_attack_dices,
              dices,
            }),
            perks:
              record.regular_attack_perks !== ""
                ? record.regular_attack_perks
                    .split(",")
                    .map((regularAttackPerk) =>
                      PerkFactory.create(regularAttackPerk as PerkNameType),
                    )
                : [],
            range: record.range as AttackRangeType,
            type: "regular",
          })
        : undefined;

    const superAttack =
      record.super_attack_dices !== ""
        ? new Attack({
            id: randomUUID(),
            dices: this.createDicesFromCsvColumn({
              encodedDices: record.super_attack_dices,
              dices,
            }),
            perks:
              record.super_attack_perks !== ""
                ? record.super_attack_perks
                    .split(",")
                    .map((superAttackPerk) =>
                      PerkFactory.create(superAttackPerk as PerkNameType),
                    )
                : [],
            range: record.range as AttackRangeType,
            type: "super",
          })
        : undefined;

    const manaCost = record.mana_cost
      .split(",")
      .map((manaByClass) => manaByClass.split(":"))
      .reduce(
        (
          manaCostObj,
          [heroClass, cost]: [Lowercase<HeroClassType>, string],
        ) => {
          manaCostObj[heroClass.toUpperCase() as Uppercase<HeroClassType>] =
            Number(cost);
          return manaCostObj;
        },
        {} as ItemManaCostJson,
      );

    const item = new Spell({
      name: record.item_id,
      level: record.item_level,
      attacks: [regularAttack, superAttack].filter((atk) => atk !== undefined),
      manaCost,
    });

    return { record, item };
  }

  private createWeaponFromCsvRecord({
    record,
    dices,
  }: { record: CsvItemRecord; dices: Array<Dice> }): {
    record: CsvItemRecord;
    item: Weapon;
  } {
    const regularAttack =
      record.regular_attack_dices !== ""
        ? new Attack({
            id: randomUUID(),
            dices: this.createDicesFromCsvColumn({
              encodedDices: record.regular_attack_dices,
              dices,
            }),
            perks:
              record.regular_attack_perks !== ""
                ? record.regular_attack_perks
                    .split(",")
                    .map((regularAttackPerk) =>
                      PerkFactory.create(regularAttackPerk as PerkNameType),
                    )
                : [],
            range: record.range as AttackRangeType,
            type: "regular",
          })
        : undefined;
    if (!regularAttack) {
      throw new Error(`Weapon "${record.item_id}" has no regular attack`);
    }

    const superAttack =
      record.super_attack_dices !== ""
        ? new Attack({
            id: randomUUID(),
            dices: this.createDicesFromCsvColumn({
              encodedDices: record.super_attack_dices,
              dices,
            }),
            perks:
              record.super_attack_perks !== ""
                ? record.super_attack_perks
                    .split(",")
                    .map((superAttackPerk) =>
                      PerkFactory.create(superAttackPerk as PerkNameType),
                    )
                : [],
            range: record.range as AttackRangeType,
            type: "super",
          })
        : undefined;

    const item = new Weapon({
      name: record.item_id,
      level: record.item_level,
      attacks: superAttack ? [regularAttack, superAttack] : [regularAttack],
    });

    return { record, item };
  }

  private createDicesFromCsvColumn({
    encodedDices,
    dices,
  }: { encodedDices: string; dices: Array<Dice> }) {
    return encodedDices
      .split(",")
      .map((encodedDice) => dices.find((dice) => dice.name === encodedDice))
      .filter((dice) => dice !== undefined);
  }
}
