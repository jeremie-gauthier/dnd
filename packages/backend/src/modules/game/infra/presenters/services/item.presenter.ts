import { GameItem, sum } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { ITEM_UI_REPOSITORY } from "src/modules/game/application/repositories/item-ui-repository.interface";
import { Dice } from "src/modules/game/domain/dice/dice.vo";
import { Artifact } from "src/modules/game/domain/item/artifact/artifact.abstract";
import { ChestTrap } from "src/modules/game/domain/item/chest-trap/chest-trap.abstract";
import { Potion } from "src/modules/game/domain/item/potion/potion.abstract";
import { Spell } from "src/modules/game/domain/item/spell/spell.entity";
import { Weapon } from "src/modules/game/domain/item/weapon/weapon.entity";
import { PostgresItemUIRepository } from "../../database/item-ui/item-ui.repository";

@Injectable()
export class ItemPresenter {
  constructor(
    @Inject(ITEM_UI_REPOSITORY)
    private readonly itemUIRepository: PostgresItemUIRepository,
  ) {}

  public async toView({
    item,
  }: {
    item: ReturnType<
      (Weapon | Spell | ChestTrap | Potion | Artifact)["toPlain"]
    >;
  }): Promise<GameItem> {
    const itemUI = await this.itemUIRepository.getOneOrThrow({
      name: item.name,
    });

    if (item.type === "Weapon" || item.type === "Spell") {
      const attacks = item.attacks?.map((attack) => ({
        ...attack,
        dices: attack.dices.map((dice) => this.getDice({ dice })),
      }));
      return { ...item, ...itemUI, attacks };
    }

    return { ...item, ...itemUI };
  }

  private getDice({
    dice,
  }: { dice: ReturnType<Dice["toPlain"]> }): Extract<
    GameItem,
    { type: "Spell" | "Weapon" }
  >["attacks"][number]["dices"][number] {
    return {
      ...dice,
      maxValue: Math.max(...dice.values),
      minValue: Math.min(...dice.values),
      meanValue: sum(...dice.values) / dice.values.length,
    };
  }
}
