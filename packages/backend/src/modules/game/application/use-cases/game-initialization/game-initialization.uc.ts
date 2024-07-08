import { randomUUID } from "node:crypto";
import { EnemyInventoryJson, StorageSpace, capitalize, zip } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import { EnemyTemplate } from "src/database/entities/enemy-template.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { GameInitializationDonePayload as CampaignGameInitializationDonePayload } from "src/modules/campaign/events/game-initialization-done.payload";
import { Board } from "src/modules/game/domain/board/board.entity";
import { Coord } from "src/modules/game/domain/coord/coord.vo";
import { Dice } from "src/modules/game/domain/dice/dice.vo";
import { GameEventFactory } from "src/modules/game/domain/game-event/game-event.factory";
import { GameMaster } from "src/modules/game/domain/game-master/game-master.entity";
import { GameStatus } from "src/modules/game/domain/game-status/game-status.vo";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { Initiative } from "src/modules/game/domain/initiative/initiative.vo";
import { Inventory } from "src/modules/game/domain/inventory/inventory.entity";
import { MonsterTemplate } from "src/modules/game/domain/monster-template/monster-template.vo";
import { PlayableEntities } from "src/modules/game/domain/playable-entities/playable-entities.aggregate";
import { Hero } from "src/modules/game/domain/playable-entities/playable-entity/hero.entity";
import { TileEntityFactory } from "src/modules/game/domain/tile-entity/tile-entity.factory";
import { Tile } from "src/modules/game/domain/tile/tile.entity";
import { Lobby } from "src/modules/lobby/domain/lobby/lobby.aggregate";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { GameInitializationDonePayload } from "src/modules/shared/events/game/game-initialization-done.payload";
import { ItemFactory } from "../../factories/item.factory";
import { GameItem } from "../../factories/item.interface";
import {
  DICE_REPOSITORY,
  DiceRepository,
} from "../../repositories/dice-repository.interface";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";
import {
  ITEM_REPOSITORY,
  ItemRepository,
} from "../../repositories/item-repository.interface";

@Injectable()
export class GameInitializationUseCase implements UseCase {
  constructor(
    @Inject(DICE_REPOSITORY)
    private readonly diceRepository: DiceRepository,
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    @Inject(ITEM_REPOSITORY)
    private readonly itemRepository: ItemRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(
    payload: CampaignGameInitializationDonePayload,
  ): Promise<void> {
    // 1. Chargement des données
    const [campaignStageProgressionFormatted, monsterTemplates] =
      await Promise.all([
        this.getUserCampaignStageProgression(payload),
        this.getMonsterTemplates(payload),
      ]);

    // 2. Creation de l'aggregate-root Game
    const board = new Board({
      ...payload.map,
      tiles: payload.map.tiles.map(
        (tile) =>
          new Tile({
            coord: new Coord(tile.coord),
            entities: tile.entities.map((tileEntity) =>
              TileEntityFactory.create(tileEntity),
            ),
            isStartingTile: tile.isStartingTile,
          }),
      ),
    });
    const playableEntities = this.getPlayableEntities({
      lobby: payload.lobby,
      campaignStageProgression: campaignStageProgressionFormatted,
    });
    const game = new Game({
      id: payload.lobby.id,
      status: new GameStatus("BATTLE_ONGOING"),
      board,
      gameMaster: new GameMaster({
        userId: payload.lobby
          .toPlain()
          .playableCharacters.find((pc) => pc.type === "game_master")
          ?.pickedBy!,
      }),
      events: payload.events.map((event) => GameEventFactory.create(event)),
      monsterTemplates,
      playableEntities,
    });

    // 3. Attribution d'une position de depart aux heros
    const startingPositionCoords = payload.map.tiles
      .filter((tile) => tile.isStartingTile)
      .map((tile) => new Coord(tile.coord));
    const playableEntityIds =
      payload.campaignStageProgression.campaignProgression.heroes.map(
        (hero) => hero.id,
      );
    if (startingPositionCoords.length < playableEntityIds.length) {
      throw new Error("Not enough starting positions for all heroes");
    }
    const playableEntitiesWithStartingPosition = zip(
      playableEntityIds,
      startingPositionCoords,
    );
    for (const [
      playableEntityId,
      startingPositionCoord,
    ] of playableEntitiesWithStartingPosition) {
      game.movePlayableEntity({
        playableEntityId,
        destinationCoord: startingPositionCoord,
      });
    }

    // 4. Roll initiatives
    game.rollInitiatives();

    await this.gameRepository.create({ game });

    this.eventEmitter.emitAsync(
      GameEvent.GameInitializationDone,
      new GameInitializationDonePayload({
        lobby: payload.lobby,
        game: game.toPlain(),
      }),
    );
  }

  private async getUserCampaignStageProgression({
    campaignStageProgression,
  }: {
    campaignStageProgression: CampaignStageProgression;
  }) {
    const itemsNames =
      campaignStageProgression.campaignProgression.heroes.flatMap((hero) =>
        hero.inventory.stuff.map(({ item }) => item.name),
      );

    const items = await Promise.all(
      itemsNames.map((name) => this.itemRepository.getOneOrThrow({ name })),
    );
    const plainItems = items.map((item) => item.toPlain());

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
                item: plainItems.find(
                  ({ name }) => stuffItem.item.name === name,
                )!,
              })),
            },
          }),
        ),
      },
    };
  }

  private getPlayableEntities({
    lobby,
    campaignStageProgression,
  }: {
    lobby: Lobby;
    campaignStageProgression: Awaited<
      ReturnType<GameInitializationUseCase["getUserCampaignStageProgression"]>
    >;
  }) {
    const plainLobby = lobby.toPlain();
    const heroPlayersMap = Object.fromEntries(
      plainLobby.playableCharacters
        .filter((pc) => pc.type === "hero")
        .map((hero) => [hero.id, hero.pickedBy]),
    );

    const heroes = campaignStageProgression.campaignProgression.heroes;
    return new PlayableEntities({
      values: heroes.map(
        (hero) =>
          new Hero({
            id: hero.id,
            type: "hero",
            status: "preparation",
            playedByUserId: heroPlayersMap[hero.id]!,
            name: hero.name,
            class: hero.class,
            initiative: new Initiative(Number.NaN),
            coord: new Coord({
              row: Number.NaN,
              column: Number.NaN,
            }),
            isBlocking: true,

            characteristic: {
              ...hero.characteristic,
              healthPoints: hero.characteristic.baseHealthPoints,
              manaPoints: hero.characteristic.baseManaPoints,
              armorClass: hero.characteristic.baseArmorClass,
              movementPoints: hero.characteristic.baseMovementPoints,
              actionPoints: hero.characteristic.baseActionPoints,
            },
            inventory: new Inventory({
              playableId: hero.id,
              storageCapacity: hero.inventory.storageCapacity,
              gear: hero.inventory.stuff
                .filter((stuff) => stuff.storageSpace === StorageSpace.GEAR)
                // .map(({ item }) => this.itemService.itemEntityToGameItem(item))
                // .filter((item): item is GameItem => item !== undefined)
                .map((stuff) =>
                  ItemFactory.create(stuff.item as unknown as GameItem),
                ),
              backpack: hero.inventory.stuff
                .filter((stuff) => stuff.storageSpace === StorageSpace.BACKPACK)
                // .map(({ item }) => this.itemService.itemEntityToGameItem(item))
                // .filter((item): item is GameItem => item !== undefined)
                .map((stuff) =>
                  ItemFactory.create(stuff.item as unknown as GameItem),
                ),
            }),
          }),
      ),
    });
  }

  private async getMonsterTemplates({
    enemyTemplates,
  }: { enemyTemplates: EnemyTemplate[] }): Promise<Array<MonsterTemplate>> {
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
    const dices = await Promise.all(
      dicesNamesUsedByEnemies.map((name) =>
        this.diceRepository.getOneOrThrow({ name }),
      ),
    );

    return enemyTemplates.map(
      (enemyTemplate) =>
        new MonsterTemplate({
          ...enemyTemplate,
          kind: enemyTemplate.name,
          inventory: this.getPlayableEntityInventoryFromEnemyInventory({
            dices,
            enemyInventory: enemyTemplate.inventory,
          }),
        }),
    );
  }

  private getPlayableEntityInventoryFromEnemyInventory({
    dices,
    enemyInventory,
  }: {
    dices: Dice[];
    enemyInventory: EnemyInventoryJson;
  }): Inventory {
    return new Inventory({
      playableId: randomUUID(),
      storageCapacity: {
        nbArtifactSlots: 0,
        nbSpellSlots: 0,
        nbWeaponSlots: 2,
        nbBackpackSlots: 1,
      },
      backpack: enemyInventory.backpack.map((item) =>
        ItemFactory.create({
          ...item,
          type: capitalize(item.type),
          attacks: item.attacks.map((attack) => ({
            ...attack,
            id: randomUUID(),
            dices: attack.dices.map((diceName) =>
              dices.find(({ name }) => name === diceName)!.toPlain(),
            ),
          })),
        }),
      ),
      gear: enemyInventory.gear.map((item) =>
        ItemFactory.create({
          ...item,
          type: capitalize(item.type),
          attacks: item.attacks.map((attack) => ({
            ...attack,
            id: randomUUID(),
            dices: attack.dices.map((diceName) =>
              dices.find(({ name }) => name === diceName)!.toPlain(),
            ),
          })),
        }),
      ),
    });
  }
}
