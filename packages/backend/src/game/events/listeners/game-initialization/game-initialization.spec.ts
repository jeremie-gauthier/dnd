import {
  GameEntity,
  HeroClass,
  LobbyEntity,
  PlayerGamePhase,
  StuffStorageCapacityJson,
} from "@dnd/shared";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test } from "@nestjs/testing";
import type { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import type { CampaignStage } from "src/database/entities/campaign-stage.entity";
import type { User } from "src/database/entities/user.entity";
import { MoveService } from "src/game/services/move/move.service";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-events.enum";
import { Mock, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InitiativeService } from "../../../services/initiative/initiative.service";
import { ItemService } from "../../../services/item/item.service";
import { MapSerializerService } from "../../../services/map-serializer/map-serializer.service";
import { PlayableEntityService } from "../../../services/playable-entity/playable-entity.service";
import { GameEvent } from "../../emitters/game-events.enum";
import { GameInitializationListener } from "./game-initialization.listener";
import { GameInitializationRepository } from "./game-initialization.repository";

type RepositoryMock = {
  getUserCampaignStageProgression: Mock<
    [
      {
        campaignStageId: CampaignStage["id"];
        userId: User["id"];
      },
    ],
    Promise<CampaignStageProgression>
  >;
  saveGame: Mock<[game: GameEntity], Promise<GameEntity>>;
};

type MapSerializerMock = {
  deserialize: Mock<any, any>;
};

describe("GameInitializationListener", () => {
  let listener: GameInitializationListener;
  let repository: RepositoryMock;
  let eventEmitter2: EventEmitter2;
  let mapSerializerService: MapSerializerMock;
  let playableEntityService: MapSerializerMock;

  let mockParams = {
    name: LobbyEvent.HostRequestedGameStart as const,
    lobby: {} as LobbyEntity,
    userId: "mock-user-id",
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GameInitializationListener,
        EventEmitter2,
        ItemService,
        {
          provide: GameInitializationRepository,
          useValue: {
            getUserCampaignStageProgression: vi.fn(),
            saveGame: vi.fn(),
            getDicesByNames: vi.fn(),
            getEnemiesByNames: vi.fn().mockResolvedValue([]),
          },
        },
        {
          provide: MapSerializerService,
          useValue: {
            deserialize: vi.fn().mockReturnValue({ id: "dummy-map" }),
          },
        },
        {
          provide: MoveService,
          useValue: {
            moveHeroToRequestedPosition: vi.fn(),
            canMoveToRequestedPosition: vi.fn().mockReturnValue(true),
          },
        },
        {
          provide: InitiativeService,
          useValue: {
            rollPlayableEntitiesInitiative: vi.fn(),
          },
        },
        {
          provide: PlayableEntityService,
          useValue: {
            getEnemiesTemplates: vi.fn().mockReturnValue([]),
            createEnemies: vi.fn(),
          },
        },
      ],
    }).compile();

    listener = module.get(GameInitializationListener);
    repository = module.get(GameInitializationRepository);
    eventEmitter2 = module.get(EventEmitter2);
    mapSerializerService = module.get(MapSerializerService);
    playableEntityService = module.get(PlayableEntityService);

    mockParams = {
      name: LobbyEvent.HostRequestedGameStart as const,
      lobby: {} as LobbyEntity,
      userId: "mock-user-id",
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(listener).toBeDefined();
    expect(repository).toBeDefined();
    expect(eventEmitter2).toBeDefined();
    expect(mapSerializerService).toBeDefined();
    expect(mockParams).toBeDefined();
    expect(playableEntityService).toBeDefined();
  });

  describe("Happy path", () => {
    it("should create a new GameEntity from a LobbyEntity", async () => {
      const eventEmitterMock = vi.spyOn(eventEmitter2, "emitAsync");
      const fakeHeroStats = {
        type: "hero",
        currentPhase: "preparation" as PlayerGamePhase,
        level: 1,
        initiative: Number.NaN,
        coord: {
          row: Number.NaN,
          column: Number.NaN,
        },
        isBlocking: true,

        characteristic: {
          baseHealthPoints: 10,
          healthPoints: 10,

          baseManaPoints: 0,
          manaPoints: 0,

          baseArmorClass: 2,
          armorClass: 2,

          baseMovementPoints: 3,
          movementPoints: 3,

          baseActionPoints: 2,
          actionPoints: 2,
        },
      };
      repository.getUserCampaignStageProgression.mockResolvedValueOnce({
        stage: {
          mapCompiled: {},
        },
        campaignProgression: {
          heroes: [
            {
              ...fakeHeroStats,
              id: "Regdar-id",
              name: "Regdar",
              class: HeroClass.WARRIOR,
              inventory: {
                stuff: [],
              },
            },
            {
              ...fakeHeroStats,
              id: "Jozan-id",
              name: "Jozan",
              class: HeroClass.CLERIC,
              inventory: {
                stuff: [],
              },
            },
            {
              ...fakeHeroStats,
              id: "Mialye-id",
              name: "Mialye",
              class: HeroClass.SORCERER,
              inventory: {
                stuff: [],
              },
            },
            {
              ...fakeHeroStats,
              id: "Lidda-id",
              name: "Lidda",
              class: HeroClass.THIEF,
              inventory: {
                stuff: [],
              },
            },
          ],
        },
      } as unknown as CampaignStageProgression);
      mapSerializerService.deserialize.mockReturnValueOnce({
        map: {
          width: 1,
          height: 1,
          tiles: [
            {
              coord: { row: 0, column: 0 },
              entities: [],
              isStartingTile: true,
            },
          ],
        },
        events: [],
      });
      repository.saveGame.mockResolvedValueOnce({
        id: "mock-lobby-id",
        status: "prepare_for_battle",
        map: {
          width: 1,
          height: 1,
          tiles: [
            {
              coord: { row: 0, column: 0 },
              entities: [],
              isStartingTile: true,
            },
          ],
        },
        gameMaster: { userId: "player-3" },
        playableEntities: {
          "Regdar-id": {
            ...fakeHeroStats,
            id: "Regdar-id",
            name: "Regdar",
            playedByUserId: "player-1",
            class: HeroClass.WARRIOR,
            type: "hero",
            actionsDoneThisTurn: [],
            inventory: {
              storageCapacity: {} as StuffStorageCapacityJson,
              gear: [],
              backpack: [],
            },
          },
          "Jozan-id": {
            ...fakeHeroStats,
            id: "Jozan-id",
            name: "Jozan",
            playedByUserId: "player-1",
            class: HeroClass.CLERIC,
            type: "hero",
            actionsDoneThisTurn: [],
            inventory: {
              storageCapacity: {} as StuffStorageCapacityJson,
              gear: [],
              backpack: [],
            },
          },
          "Mialye-id": {
            ...fakeHeroStats,
            id: "Mialye-id",
            name: "Mialye",
            playedByUserId: "player-1",
            class: HeroClass.SORCERER,
            type: "hero",
            actionsDoneThisTurn: [],
            inventory: {
              storageCapacity: {} as StuffStorageCapacityJson,
              gear: [],
              backpack: [],
            },
          },
          "Lidda-id": {
            ...fakeHeroStats,
            id: "Lidda-id",
            name: "Lidda",
            playedByUserId: "player-2",
            class: HeroClass.THIEF,
            type: "hero",
            actionsDoneThisTurn: [],
            inventory: {
              storageCapacity: {} as StuffStorageCapacityJson,
              gear: [],
              backpack: [],
            },
          },
        },
        timeline: [],
        events: [],
        enemyTemplates: {},
      });

      await listener.handler({
        ...mockParams,
        lobby: {
          id: "mock-lobby-id",
          status: "GAME_INITIALIZING",
          host: {
            userId: mockParams.userId,
          },
          config: {
            nbPlayersMax: 3,
            campaign: {
              id: "mock-campaign",
              stage: {
                id: "mock-campaign-stage",
              },
            },
          },
          gameMaster: { userId: "player-3" },
          heroesAvailable: [
            {
              ...fakeHeroStats,
              id: "Regdar-id",
              name: "Regdar",
              playedByUserId: "player-1",
              class: HeroClass.WARRIOR,
            },
            {
              ...fakeHeroStats,
              id: "Jozan-id",
              name: "Jozan",
              playedByUserId: "player-1",
              class: HeroClass.CLERIC,
            },
            {
              ...fakeHeroStats,
              id: "Mialye-id",
              name: "Mialye",
              playedByUserId: "player-1",
              class: HeroClass.SORCERER,
            },
            {
              ...fakeHeroStats,
              id: "Lidda-id",
              name: "Lidda",
              playedByUserId: "player-2",
              class: HeroClass.THIEF,
            },
          ],
        } as unknown as LobbyEntity,
      });

      expect(eventEmitterMock).toHaveBeenCalledTimes(2);
      expect(eventEmitterMock).toHaveBeenCalledWith(
        GameEvent.GameInitializationStarted,
        expect.objectContaining({}),
      );
      expect(eventEmitterMock).toHaveBeenCalledWith(
        GameEvent.GameInitializationDone,
        expect.objectContaining({}),
      );
    });
  });
});
