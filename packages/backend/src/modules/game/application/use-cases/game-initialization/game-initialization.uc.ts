import { zip } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UseCase } from "src/interfaces/use-case.interface";
import { GameInitializationDonePayload as CampaignGameInitializationDonePayload } from "src/modules/campaign/events/game-initialization-done.payload";
import { GameMaster } from "src/modules/game/domain/game-master/game-master.entity";
import { GameStatus } from "src/modules/game/domain/game-status/game-status.vo";
import { Game } from "src/modules/game/domain/game/game.aggregate";
import { PlayableEntities } from "src/modules/game/domain/playable-entities/playable-entities.aggregate";
import { GameStatus as EGameStatus } from "src/modules/game/infra/database/enums/game-status.enum";
import { GameEvent } from "src/modules/shared/events/game/game-event.enum";
import { GameInitializationDonePayload } from "src/modules/shared/events/game/game-initialization-done.payload";
import {
  GAME_PROGRESSION_REPOSITORY,
  GameProgressionRepository,
} from "../../repositories/game-progression-repository.interface";
import {
  GAME_REPOSITORY,
  GameRepository,
} from "../../repositories/game-repository.interface";
import {
  GAME_TEMPLATE_REPOSITORY,
  GameTemplateRepository,
} from "../../repositories/game-template-repository.interface";

@Injectable()
export class GameInitializationUseCase implements UseCase {
  constructor(
    @Inject(GAME_REPOSITORY)
    private readonly gameRepository: GameRepository,
    @Inject(GAME_PROGRESSION_REPOSITORY)
    private readonly gameProgressionRepository: GameProgressionRepository,
    @Inject(GAME_TEMPLATE_REPOSITORY)
    private readonly gameTemplateRepository: GameTemplateRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute(
    payload: CampaignGameInitializationDonePayload,
  ): Promise<void> {
    // 1. Chargement des héros deja existants, ou creation a partir des templates
    const [heroes, gameTemplate] = await Promise.all([
      this.gameProgressionRepository.getHeroes({
        userId: payload.lobby.host.userId,
        campaignId:
          payload.campaignStageProgression.campaignProgression.campaignId,
      }),
      this.gameTemplateRepository.getOneOrThrow({
        campaignId:
          payload.campaignStageProgression.campaignProgression.campaignId,
      }),
    ]);

    // 2. Creation de l'aggregate-root Game
    const game = new Game({
      ...gameTemplate,
      id: payload.lobby.id,
      host: payload.lobby.host,
      status: new GameStatus(EGameStatus.BATTLE_ONGOING),
      gameMaster: new GameMaster({
        userId: payload.lobby.playableCharacters.find(
          (pc) => pc.type === "game_master",
        )?.pickedBy!,
      }),
      playableEntities: new PlayableEntities({ values: heroes }),
      maxLevelLoot: payload.campaignStageProgression.stage.maxLevelLoot,
      itemsLooted: [],
      monstersKilled: [],
    });

    // 3. Attribution d'une position de depart aux heros
    const startingPositionCoords = gameTemplate.board.getStartingTiles();
    const playableEntityIds = heroes.map((hero) => hero.id);
    if (startingPositionCoords.length < playableEntityIds.length) {
      throw new Error("Not enough starting positions for all heroes");
    }
    const playableEntitiesWithStartingPosition = zip(
      playableEntityIds,
      startingPositionCoords,
    );
    for (const [
      playableEntityId,
      startingTile,
    ] of playableEntitiesWithStartingPosition) {
      game.movePlayableEntity({
        playableEntityId,
        destinationCoord: startingTile.coord,
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

  // private async getUserCampaignStageProgression({
  //   campaignStageProgression,
  // }: {
  //   campaignStageProgression: CampaignStageProgression;
  // }) {
  //   // 1. restaurer la progression de l'userId sur cette campaignId (relation heroes necessaire)

  //   const itemsNames =
  //     campaignStageProgression.campaignProgression.heroes.flatMap((hero) =>
  //       hero.inventory.stuff.map(({ item }) => item.name),
  //     );

  //   const items = await Promise.all(
  //     itemsNames.map((name) => this.itemRepository.getOneOrThrow({ name })),
  //   );
  //   const plainItems = items.map((item) => item.toPlain());

  //   return {
  //     ...campaignStageProgression,
  //     campaignProgression: {
  //       ...campaignStageProgression.campaignProgression,
  //       heroes: campaignStageProgression.campaignProgression.heroes.map(
  //         (hero) => ({
  //           ...hero,
  //           inventory: {
  //             ...hero.inventory,
  //             stuff: hero.inventory.stuff.map((stuffItem) => ({
  //               ...stuffItem,
  //               item: plainItems.find(
  //                 ({ name }) => stuffItem.item.name === name,
  //               )!,
  //             })),
  //           },
  //         }),
  //       ),
  //     },
  //   };
  // }

  // private getPlayableEntities({
  //   lobby,
  //   campaignStageProgression,
  // }: {
  //   lobby: ReturnType<Lobby["toPlain"]>;
  //   campaignStageProgression: Awaited<
  //     ReturnType<GameInitializationUseCase["getUserCampaignStageProgression"]>
  //   >;
  // }) {
  //   const heroPlayersMap = Object.fromEntries(
  //     lobby.playableCharacters
  //       .filter((pc) => pc.type === "hero")
  //       .map((hero) => [hero.id, hero.pickedBy]),
  //   );

  //   const heroes = campaignStageProgression.campaignProgression.heroes;
  //   return new PlayableEntities({
  //     values: heroes.map((hero) => {
  //       const HeroClass = HeroFactory.getHeroClass(hero.name);
  //       return new HeroClass({
  //         id: hero.id,
  //         type: hero.type,
  //         race: hero.race,
  //         status: new PlayerStatus(CurrentPhase.IDLE),
  //         playedByUserId: heroPlayersMap[hero.id]!,
  //         name: hero.name,
  //         class: hero.class,
  //         level: hero.level,
  //         initiative: new Initiative(Number.NaN),
  //         coord: new Coord({
  //           row: Number.NaN,
  //           column: Number.NaN,
  //         }),
  //         isBlocking: true,
  //         baseCharacteristic: hero.characteristic,
  //         characteristic: hero.characteristic,
  //         actionsDoneThisTurn: [],
  //         inventory: new Inventory({
  //           playableId: hero.id,
  //           storageCapacity: hero.inventory.storageCapacity,
  //           gear: hero.inventory.stuff
  //             .filter((stuff) => stuff.storageSpace === StorageSpace.GEAR)
  //             .map(
  //               (stuff) =>
  //                 ItemFactory.create(
  //                   stuff.item as unknown as
  //                     | ArtifactItem
  //                     | WeaponItem
  //                     | SpellItem,
  //                 ) as Artifact | Weapon | Spell,
  //             ),
  //           backpack: hero.inventory.stuff
  //             .filter((stuff) => stuff.storageSpace === StorageSpace.BACKPACK)
  //             .map((stuff) =>
  //               ItemFactory.create(stuff.item as unknown as GameItem),
  //             ),
  //         }),
  //         conditions: [],
  //       });
  //     }),
  //   });
  // }

  // private async getMonsterTemplates({
  //   enemyTemplates,
  // }: {
  //   enemyTemplates: MonsterTemplatePersistence[];
  // }): Promise<MonsterTemplates> {
  //   return new MonsterTemplates({
  //     values: await Promise.all(
  //       enemyTemplates.map(
  //         async (enemyTemplate) =>
  //           new MonsterTemplateDomain({
  //             ...enemyTemplate,
  //             inventory:
  //               await this.getPlayableEntityInventoryFromEnemyInventory({
  //                 enemyInventory: enemyTemplate.inventory,
  //               }),
  //           }),
  //       ),
  //     ),
  //   });
  // }

  // private async getPlayableEntityInventoryFromEnemyInventory({
  //   enemyInventory,
  // }: {
  //   enemyInventory: InventoryPersistence;
  // }): Promise<Inventory> {
  //   const backpackItemNames = enemyInventory.items
  //     .filter((item) => item.storageSpace === StorageSpace.BACKPACK)
  //     .map(({ itemName }) => itemName);
  //   const gearItemNames = enemyInventory.items
  //     .filter((item) => item.storageSpace === StorageSpace.GEAR)
  //     .map(({ itemName }) => itemName);

  //   const [backpackItems, gearItems] = await Promise.all([
  //     Promise.all(
  //       backpackItemNames.map((name) =>
  //         this.itemRepository.getOneOrThrow({ name }),
  //       ),
  //     ),
  //     Promise.all(
  //       gearItemNames.map(
  //         (name) =>
  //           this.itemRepository.getOneOrThrow({ name }) as Promise<
  //             Artifact | Weapon | Spell
  //           >,
  //       ),
  //     ),
  //   ]);

  //   return new Inventory({
  //     playableId: randomUUID(),
  //     storageCapacity: enemyInventory.storageCapacity,
  //     backpack: backpackItems.map((item) => item),
  //     gear: gearItems.map((item) => item),
  //   });
  // }
}
