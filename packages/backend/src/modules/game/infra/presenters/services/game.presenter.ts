import { Injectable } from "@nestjs/common";
import { ArtifactResponseDto } from "src/modules/game/application/dtos/response/artifact.dto";
import { GameResponseDto } from "src/modules/game/application/dtos/response/game.dto";
import { PotionResponseDto } from "src/modules/game/application/dtos/response/potion.dto";
import { SpellResponseDto } from "src/modules/game/application/dtos/response/spell.dto";
import { WeaponResponseDto } from "src/modules/game/application/dtos/response/weapon.dto";
import { Game as GameDomain } from "src/modules/game/domain/game/game.aggregate";
import { Inventory } from "src/modules/game/domain/inventory/inventory.entity";
import { StorageSpace } from "../../database/enums/storage-space.enum";
import { HeroUIPostgresRepository } from "../../database/repositories/hero-ui.repository";
import { ItemPresenter } from "./item.presenter";

@Injectable()
export class GamePresenter {
  constructor(
    private readonly itemPresenter: ItemPresenter,
    private readonly heroUIRepository: HeroUIPostgresRepository,
  ) {}

  public async toView(
    domain: ReturnType<GameDomain["toPlain"]>,
  ): Promise<GameResponseDto> {
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
  }): Promise<GameResponseDto["playableEntities"][number]["inventory"]> {
    const [backpack, gear] = await Promise.all([
      Promise.all(
        inventory[StorageSpace.BACKPACK].map(
          (item) =>
            this.itemPresenter.toView({ item }) as Promise<
              | ArtifactResponseDto
              | WeaponResponseDto
              | SpellResponseDto
              | PotionResponseDto
            >,
        ),
      ),
      Promise.all(
        inventory[StorageSpace.GEAR].map(
          (item) =>
            this.itemPresenter.toView({ item }) as Promise<
              ArtifactResponseDto | WeaponResponseDto | SpellResponseDto
            >,
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
