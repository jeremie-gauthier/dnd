import { GameItem, GameView, sum } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { Dice } from "src/modules/game/domain/dice/dice.vo";
import { Spell } from "src/modules/game/domain/item/spell/spell.entity";
import { Weapon } from "src/modules/game/domain/item/weapon/weapon.entity";
import { PostgresDiceUIRepository } from "../../database/dice-ui/dice-ui.repository";
import { PostgresItemUIRepository } from "../../database/item-ui/item-ui.repository";

@Injectable()
export class ItemPresenter {
  constructor(
    private readonly diceUIRepository: PostgresDiceUIRepository,
    private readonly itemUIRepository: PostgresItemUIRepository,
  ) {}

  public async toView({
    item,
  }: { item: ReturnType<(Weapon | Spell)["toPlain"]> }): Promise<GameItem> {
    const itemUI = await this.itemUIRepository.getOneOrThrow({
      name: item.name,
    });

    const attacks = await Promise.all(
      item.attacks?.map(async (attack) => ({
        ...attack,
        dices: await Promise.all(
          attack.dices.map((dice) => this.getDice({ dice })),
        ),
      })),
    );

    return {
      ...item,
      ...itemUI,
      attacks,
    };
  }

  private async getDice({
    dice,
  }: { dice: ReturnType<Dice["toPlain"]> }): Promise<
    GameView["playableEntities"][string]["inventory"][
      | "backpack"
      | "gear"][number]["attacks"][number]["dices"][number]
  > {
    const diceUI = await this.diceUIRepository.getOneOrThrow({
      name: dice.name,
    });

    return {
      ...dice,
      ...diceUI,
      maxValue: Math.max(...dice.values),
      minValue: Math.min(...dice.values),
      meanValue: sum(...dice.values) / dice.values.length,
    };
  }
}
