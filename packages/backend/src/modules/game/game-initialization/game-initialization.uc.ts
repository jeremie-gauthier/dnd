import {
  EnemyInventoryJson,
  EnemyKind,
  GameEntity,
  GameItem,
  LobbyEntity,
  PlayableHeroEntity,
  StorageSpace,
  Tile,
  unique,
} from "@dnd/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { randomUUID } from "node:crypto";
import type { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Dice } from "src/database/entities/dice.entity";
import { Hero } from "src/database/entities/hero.entity";
import { User } from "src/database/entities/user.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { MoveService } from "src/modules/game/services/move/move.service";
import type { HostRequestedGameStartPayload } from "src/modules/lobby/events/host-requested-game-start.payload";
import { GameEvent } from "../events/game-event.enum";
import { GameInitializationDonePayload } from "../events/game-initialization-done.payload";
import { GameInitializationStartedPayload } from "../events/game-initialization-started.payload";
import { InitiativeService } from "../services/initiative/initiative.service";
import { ItemService } from "../services/item/item.service";
import { MapSerializerService } from "../services/map-serializer/map-serializer.service";
import { GameInitializationRepository } from "./game-initialization.repository";

@Injectable()
export class GameInitializationUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: GameInitializationRepository,
    private readonly mapSerializer: MapSerializerService,
    private readonly moveService: MoveService,
    private readonly initiativeService: InitiativeService,
    private readonly itemService: ItemService,
  ) {}

  public async execute({
    lobby,
  }: HostRequestedGameStartPayload): Promise<void> {
    this.eventEmitter.emitAsync(
      GameEvent.GameInitializationStarted,
      new GameInitializationStartedPayload({ lobby }),
    );

    const game = await this.createGame({ lobby });

    this.eventEmitter.emitAsync(
      GameEvent.GameInitializationDone,
      new GameInitializationDonePayload({ lobby, game }),
    );
  }

  private async createGame({
    lobby,
  }: { lobby: LobbyEntity }): Promise<GameEntity> {
    const campaignStageProgression = await this.getUserCampaignStageProgression(
      {
        campaignStageId: lobby.config.campaign.stage.id,
        userId: lobby.host.userId,
      },
    );

    const { map, events } = this.mapSerializer.deserialize(
      campaignStageProgression.stage.mapCompiled,
    );
    const playableEntities = this.getPlayableEntitiesMap({
      lobby,
      campaignStageProgression,
    });
    const enemyTemplates = await this.getEnemyTemplates({ events });

    const game: GameEntity = {
      id: lobby.id,
      status: "battle_ongoing",
      gameMaster: {
        userId: lobby.gameMaster.userId!,
      },
      map,
      playableEntities,
      timeline: [],
      events,
      enemyTemplates,
    };

    this.randomlyPlaceHeroesOnStartingTiles({ game });
    this.initiativeService.rollPlayableEntitiesInitiative({ game });
    this.setPlayerGamePhase({ game });

    const savedGame = await this.repository.saveGame(game);

    return savedGame;
  }

  private async getUserCampaignStageProgression({
    campaignStageId,
    userId,
  }: { campaignStageId: CampaignStage["id"]; userId: User["id"] }) {
    const campaignStageProgression =
      await this.repository.getUserCampaignStageProgression({
        campaignStageId,
        userId,
      });

    const itemsNames =
      campaignStageProgression.campaignProgression.heroes.flatMap((hero) =>
        hero.inventory.stuff.map(({ item }) => item.name),
      );

    const items = await Promise.all(
      itemsNames.map((itemName) =>
        this.repository.getItemAttributes({ itemName }),
      ),
    );

    return {
      ...campaignStageProgression,
      campaignProgression: {
        ...campaignStageProgression.campaignProgression,
        heroes: campaignStageProgression.campaignProgression.heroes.map(
          (hero) => ({
            ...hero,
            inventory: {
              ...hero.inventory,
              stuff: hero.inventory.stuff.map((stuffItem) => ({
                ...stuffItem,
                item: items.find((item) => stuffItem.item.name === item.name)!,
              })),
            },
          }),
        ),
      },
    };
  }

  private getPlayableEntitiesMap({
    lobby,
    campaignStageProgression,
  }: {
    lobby: LobbyEntity;
    campaignStageProgression: CampaignStageProgression;
  }): GameEntity["playableEntities"] {
    const heroPlayersMap = Object.fromEntries(
      lobby.heroesAvailable.map((hero) => [hero.id, hero.pickedBy!]),
    );

    const heroes = campaignStageProgression.campaignProgression.heroes;
    return Object.fromEntries(
      heroes.map(
        (hero) =>
          [
            hero.id,
            {
              id: hero.id,
              type: "hero",
              currentPhase: "preparation",
              playedByUserId: heroPlayersMap[hero.id]!,
              name: hero.name,
              class: hero.class,
              level: hero.level,
              initiative: Number.NaN,
              coord: {
                row: Number.NaN,
                column: Number.NaN,
              },
              isBlocking: true,

              characteristic: {
                ...hero.characteristic,
                healthPoints: hero.characteristic.baseHealthPoints,
                manaPoints: hero.characteristic.baseManaPoints,
                armorClass: hero.characteristic.baseArmorClass,
                movementPoints: hero.characteristic.baseMovementPoints,
                actionPoints: hero.characteristic.baseActionPoints,
              },
              inventory: {
                storageCapacity: hero.inventory.storageCapacity,
                gear: hero.inventory.stuff
                  .filter((item) => item.storageSpace === StorageSpace.GEAR)
                  .map(({ item }) =>
                    this.itemService.itemEntityToGameItem(item),
                  )
                  .filter((item): item is GameItem => item !== undefined),
                backpack: hero.inventory.stuff
                  .filter((item) => item.storageSpace === StorageSpace.BACKPACK)
                  .map(({ item }) =>
                    this.itemService.itemEntityToGameItem(item),
                  )
                  .filter((item): item is GameItem => item !== undefined),
              },
              actionsDoneThisTurn: [],
            },
          ] satisfies [Hero["id"], PlayableHeroEntity],
      ),
    );
  }

  private randomlyPlaceHeroesOnStartingTiles({
    game,
  }: { game: GameEntity }): void {
    const playableEntities = Object.values(game.playableEntities);
    for (const playableEntity of playableEntities) {
      if (playableEntity.type !== "hero") continue;

      const firstFreeStartingTile = this.getFirstFreeStartingTileOrThrow(game);
      this.moveService.moveHeroToRequestedPosition({
        game,
        heroId: playableEntity.id,
        requestedPosition: firstFreeStartingTile.coord,
      });
    }
  }

  private getFirstFreeStartingTileOrThrow(game: GameEntity): Tile {
    const firstFreeStartingTile = game.map.tiles.find(
      (tile) =>
        tile.isStartingTile &&
        this.moveService.canMoveToRequestedPosition({
          game,
          requestedPosition: tile.coord,
        }),
    );
    if (!firstFreeStartingTile) {
      throw new NotFoundException("No free starting tile found");
    }

    return firstFreeStartingTile;
  }

  private setPlayerGamePhase({ game }: { game: GameEntity }): void {
    const playableEntities = Object.values(game.playableEntities);
    for (const playableEntity of playableEntities) {
      playableEntity.currentPhase = "idle";
    }

    const firstPlayableEntityIdToPlay = game.timeline[0];
    if (!firstPlayableEntityIdToPlay) return;

    const firstPlayableEntityToPlay =
      game.playableEntities[firstPlayableEntityIdToPlay];
    if (!firstPlayableEntityToPlay) return;

    firstPlayableEntityToPlay.currentPhase = "action";
  }

  private async getEnemyTemplates({
    events,
  }: { events: GameEntity["events"] }): Promise<GameEntity["enemyTemplates"]> {
    const enemiesName = this.getDistinctAvailableEnemies({ events });
    const enemyTemplates = await this.repository.getEnemiesByNames({
      enemiesName,
    });

    const dicesNamesUsedByEnemies = Array.from(
      new Set(
        enemyTemplates.flatMap((enemyTemplate) =>
          Object.values(enemyTemplate.inventory).flatMap((weapons) =>
            weapons.flatMap(({ attacks }) =>
              attacks.flatMap(({ dices }) => dices),
            ),
          ),
        ),
      ),
    );
    const dices = await this.repository.getDicesByNames({
      diceNames: dicesNamesUsedByEnemies,
    });

    return Object.fromEntries(
      enemyTemplates.map((enemyTemplate) => [
        enemyTemplate.name,
        {
          ...enemyTemplate,
          inventory: this.getPlayableEntityInventoryFromEnemyInventory({
            dices,
            enemyInventory: enemyTemplate.inventory,
          }),
        },
      ]),
    );
  }

  private getPlayableEntityInventoryFromEnemyInventory({
    dices,
    enemyInventory,
  }: {
    dices: Dice[];
    enemyInventory: EnemyInventoryJson;
  }): GameEntity["enemyTemplates"][number]["inventory"] {
    return {
      storageCapacity: {
        nbArtifactSlots: 0,
        nbSpellSlots: 0,
        nbWeaponSlots: 2,
        nbBackpackSlots: 1,
      },
      backpack: enemyInventory.backpack.map((item) => ({
        ...item,
        type: "Weapon",
        attacks: item.attacks.map((attack) => ({
          ...attack,
          id: randomUUID(),
          dices: attack.dices.map(
            (diceName) => dices.find(({ name }) => name === diceName)!,
          ),
        })),
      })),
      gear: enemyInventory.gear.map((item) => ({
        ...item,
        type: "Weapon",
        attacks: item.attacks.map((attack) => ({
          ...attack,
          id: randomUUID(),
          dices: attack.dices.map(
            (diceName) => dices.find(({ name }) => name === diceName)!,
          ),
        })),
      })),
    };
  }

  private getDistinctAvailableEnemies({
    events,
  }: { events: GameEntity["events"] }): EnemyKind[] {
    return unique(events.flatMap((event) => event?.enemies ?? []));
  }
}
