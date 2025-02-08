import { sum } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { ArtifactResponseDto } from "src/modules/game/application/dtos/response/artifact.dto";
import { ChestTrapResponseDto } from "src/modules/game/application/dtos/response/chest-trap.dto";
import { PotionResponseDto } from "src/modules/game/application/dtos/response/potion.dto";
import { SpellResponseDto } from "src/modules/game/application/dtos/response/spell.dto";
import { WeaponResponseDto } from "src/modules/game/application/dtos/response/weapon.dto";
import { ITEM_UI_REPOSITORY } from "src/modules/game/application/repositories/item-ui-repository.interface";
import { Dice as DiceDomain } from "src/modules/game/domain/dice/dice.vo";
import { Artifact as ArtifactDomain } from "src/modules/game/domain/item/artifact/artifact.abstract";
import { ChestTrap as ChestTrapDomain } from "src/modules/game/domain/item/chest-trap/chest-trap.abstract";
import { Potion as PotionDomain } from "src/modules/game/domain/item/potion/potion.abstract";
import { Spell as SpellDomain } from "src/modules/game/domain/item/spell/spell.entity";
import { Weapon as WeaponDomain } from "src/modules/game/domain/item/weapon/weapon.entity";
import { Dice as DicePersistence } from "../../database/entities/item/dice/dice.entity";
import { ItemType } from "../../database/enums/item-type.enum";
import { ItemUIPostgresRepository } from "../../database/repositories/item-ui.repository";

@Injectable()
export class ItemPresenter {
  constructor(
    @Inject(ITEM_UI_REPOSITORY)
    private readonly itemUIRepository: ItemUIPostgresRepository,
  ) {}

  public async toView({
    item,
  }: {
    item: ReturnType<
      (
        | WeaponDomain
        | SpellDomain
        | ChestTrapDomain
        | PotionDomain
        | ArtifactDomain
      )["toPlain"]
    >;
  }): Promise<
    | WeaponResponseDto
    | SpellResponseDto
    | ChestTrapResponseDto
    | PotionResponseDto
    | ArtifactResponseDto
  > {
    const itemUI = await this.itemUIRepository.getOneOrThrow({
      name: item.name,
    });

    if (item.type === ItemType.WEAPON || item.type === ItemType.SPELL) {
      const attacks = item.attacks?.map((attack) => ({
        ...attack,
        dices: attack.dices.map((dice) => this.getDice({ dice })),
      }));
      return { ...item, ...itemUI, attacks } as
        | WeaponResponseDto
        | SpellResponseDto;
    }

    return { ...item, ...itemUI };
  }

  private getDice({
    dice,
  }: {
    dice: ReturnType<DiceDomain["toPlain"]>;
  }): DicePersistence {
    return {
      ...dice,
      maxValue: Math.max(...dice.values),
      minValue: Math.min(...dice.values),
      meanValue: sum(...dice.values) / dice.values.length,
    };
  }
}
