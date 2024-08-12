import { Map as GameMap, GameView, sum } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { Dice } from "src/modules/game/domain/dice/dice.vo";
import { Game as GameDomain } from "src/modules/game/domain/game/game.aggregate";
import { Inventory } from "src/modules/game/domain/inventory/inventory.entity";
import { Spell } from "src/modules/game/domain/item/spell/spell.entity";
import { Weapon } from "src/modules/game/domain/item/weapon/weapon.entity";
import { PostgresDiceUIRepository } from "../../database/dice-ui/dice-ui.repository";
import { PostgresItemUIRepository } from "../../database/item-ui/item-ui.repository";

@Injectable()
export class GamePresenter {
  constructor(
    private readonly diceUIRepository: PostgresDiceUIRepository,
    private readonly itemUIRepository: PostgresItemUIRepository,
  ) {}

  public async toView(
    domain: ReturnType<GameDomain["toPlain"]>,
  ): Promise<GameView> {
    return {
      ...domain,
      status: domain.status.toLowerCase() as Lowercase<
        (typeof domain)["status"]
      >,
      playableEntities: Object.fromEntries(
        await Promise.all(
          domain.playableEntities.values.map(async (playableEntity) => {
            return [
              playableEntity.id,
              {
                ...playableEntity,
                currentPhase: playableEntity.status.toLowerCase(),
                inventory: await this.getInventory({
                  inventory: playableEntity.inventory,
                }),
              },
            ];
          }),
        ),
      ),
      map: domain.board as GameMap,
      timeline: domain.playableEntities.values
        .sort((a, b) => b.initiative - a.initiative)
        .map(({ id }) => id),
    };
  }

  private async getInventory({
    inventory,
  }: {
    inventory: ReturnType<Inventory["toPlain"]>;
  }): Promise<GameView["playableEntities"][string]["inventory"]> {
    const [backpack, gear] = await Promise.all([
      Promise.all(inventory.backpack.map((item) => this.getItem({ item }))),
      Promise.all(inventory.gear.map((item) => this.getItem({ item }))),
    ]);

    return {
      backpack,
      gear,
      storageCapacity: inventory.storageCapacity,
    };
  }

  private async getItem({
    item,
  }: { item: ReturnType<(Weapon | Spell)["toPlain"]> }): Promise<
    GameView["playableEntities"][string]["inventory"][
      | "backpack"
      | "gear"][number]
  > {
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
