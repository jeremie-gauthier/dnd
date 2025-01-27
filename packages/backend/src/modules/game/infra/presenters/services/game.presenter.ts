import { Injectable } from "@nestjs/common";
import { StorageSpace } from "src/database/enums/storage-space.enum";
import { GameView } from "src/modules/game/application/dtos/game-view.dto";
import { Game as GameDomain } from "src/modules/game/domain/game/game.aggregate";
import { Inventory } from "src/modules/game/domain/inventory/inventory.entity";
import { PostgresHeroUIRepository } from "../../database/hero-ui/hero-ui.repository";
import { ItemPresenter } from "./item.presenter";

@Injectable()
export class GamePresenter {
  constructor(
    private readonly itemPresenter: ItemPresenter,
    private readonly heroUIRepository: PostgresHeroUIRepository,
  ) {}

  public async toView(
    domain: ReturnType<GameDomain["toPlain"]>,
  ): Promise<GameView> {
    return {
      ...domain,
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
                imgUrl:
                  playableEntity.faction === "hero"
                    ? (
                        await this.heroUIRepository.getOneOrThrow({
                          name: playableEntity.name,
                        })
                      ).imgUrl
                    : undefined,
              },
            ];
          }),
        ),
      ),
      timeline: domain.playableEntities.values
        .toSorted((a, b) => b.initiative - a.initiative)
        .map(({ id }) => id),
    };
  }

  private async getInventory({
    inventory,
  }: {
    inventory: ReturnType<Inventory["toPlain"]>;
  }): Promise<GameView["playableEntities"][number]["inventory"]> {
    const [backpack, gear] = await Promise.all([
      Promise.all(
        inventory[StorageSpace.BACKPACK].map((item) =>
          this.itemPresenter.toView({ item }),
        ),
      ),
      Promise.all(
        inventory[StorageSpace.GEAR].map((item) =>
          this.itemPresenter.toView({ item }),
        ),
      ),
    ]);

    return {
      backpack,
      gear,
      storageCapacity: inventory.storageCapacity,
    };
  }
}
