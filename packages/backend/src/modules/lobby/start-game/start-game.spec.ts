import { LobbyEntityStatus, type LobbyEntity } from "@dnd/shared";
import { ForbiddenException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test } from "@nestjs/testing";
import { LobbyEvent } from "src/modules/lobby/events/lobby-event.enum";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockInstance,
} from "vitest";
import { BackupService } from "../services/backup/backup.service";
import { StartGameUseCase } from "./start-game.uc";

describe("StartGameUseCase", () => {
  let useCase: StartGameUseCase;
  let backupService: BackupService;
  let eventEmitter2: EventEmitter2;

  let updateLobbyMock: MockInstance<[{ lobby: LobbyEntity }], Promise<void>>;
  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  const mockParams = {
    userId: "mock-user-id",
    lobbyId: "mock-lobby-id",
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StartGameUseCase,
        EventEmitter2,
        {
          provide: BackupService,
          useValue: {
            updateLobby: () => Promise.resolve(),
            getLobbyOrThrow: vi.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: (key: string) => key,
          },
        },
      ],
    }).compile();

    useCase = module.get(StartGameUseCase);
    backupService = module.get(BackupService);
    eventEmitter2 = module.get(EventEmitter2);

    updateLobbyMock = vi.spyOn(backupService, "updateLobby");
    eventEmitterMock = vi.spyOn(eventEmitter2, "emitAsync");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(eventEmitter2).toBeDefined();
    expect(updateLobbyMock).toBeDefined();
    expect(eventEmitterMock).toBeDefined();
  });

  describe("Happy path", async () => {
    it("should set the lobby as ready for a game when everyone is ready", async () => {
      const getLobbyByIdMock = vi
        .spyOn(backupService, "getLobbyOrThrow")
        .mockResolvedValue({
          id: "mock-lobby-id",
          status: LobbyEntityStatus.OPENED,
          config: {
            campaign: {
              id: "mock-campaign-id",
              stage: {
                id: "mock-stage-id",
              },
            },
          },
          host: {
            userId: "mock-user-id",
          },
          players: [
            {
              userId: "mock-user-id",
              heroesSelected: ["warrior"],
              isReady: true,
            },
            {
              userId: "mock-user-id-2",
              heroesSelected: ["cleric"],
              isReady: true,
            },
            {
              userId: "mock-user-id-3",
              heroesSelected: ["thief"],
              isReady: true,
            },
            {
              userId: "mock-user-id-4",
              heroesSelected: [],
              isReady: true,
            },
          ],
          gameMaster: { userId: "mock-user-id-4" },
          heroesAvailable: [
            { id: "warrior", pickedBy: "mock-user-id" },
            { id: "cleric", pickedBy: "mock-user-id-2" },
            { id: "thief", pickedBy: "mock-user-id-3" },
          ],
        } as LobbyEntity);

      await useCase.execute(mockParams);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledWith({
        lobby: {
          id: "mock-lobby-id",
          status: LobbyEntityStatus.GAME_INITIALIZING,
          config: {
            campaign: {
              id: "mock-campaign-id",
              stage: {
                id: "mock-stage-id",
              },
            },
          },
          host: {
            userId: "mock-user-id",
          },
          players: [
            {
              userId: "mock-user-id",
              heroesSelected: ["warrior"],
              isReady: true,
            },
            {
              userId: "mock-user-id-2",
              heroesSelected: ["cleric"],
              isReady: true,
            },
            {
              userId: "mock-user-id-3",
              heroesSelected: ["thief"],
              isReady: true,
            },
            {
              userId: "mock-user-id-4",
              heroesSelected: [],
              isReady: true,
            },
          ],
          gameMaster: { userId: "mock-user-id-4" },
          heroesAvailable: [
            { id: "warrior", pickedBy: "mock-user-id" },
            { id: "cleric", pickedBy: "mock-user-id-2" },
            { id: "thief", pickedBy: "mock-user-id-3" },
          ],
        },
      });

      expect(eventEmitterMock).toHaveBeenCalledTimes(1);
      expect(eventEmitterMock).toHaveBeenCalledWith(
        LobbyEvent.HostRequestedGameStart,
        expect.objectContaining({}),
      );
    });
  });

  describe("Negative path", () => {
    it("should throw a ForbiddenException if some players are not ready", async () => {
      const getLobbyByIdMock = vi
        .spyOn(backupService, "getLobbyOrThrow")
        .mockResolvedValue({
          id: "mock-lobby-id",
          status: "preparing",
          players: [
            {
              userId: "mock-user-id",
              heroesSelected: ["warrior"],
              isReady: true,
            },
            {
              userId: "mock-user-id-2",
              heroesSelected: ["cleric"],
              isReady: false,
            },
          ],
          heroesAvailable: [
            { id: "warrior", pickedBy: "mock-user-id" },
            { id: "cleric", pickedBy: "mock-user-id-2" },
          ],
        } as unknown as LobbyEntity);

      await expect(useCase.execute(mockParams)).rejects.toThrowError(
        ForbiddenException,
      );

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).not.toHaveBeenCalled();
      expect(eventEmitterMock).not.toHaveBeenCalled();
    });

    it("should throw a ForbiddenException if some heroes are not picked", async () => {
      const getLobbyByIdMock = vi
        .spyOn(backupService, "getLobbyOrThrow")
        .mockResolvedValue({
          id: "mock-lobby-id",
          status: "preparing",
          players: [
            {
              userId: "mock-user-id",
              heroesSelected: ["warrior"],
              isReady: true,
            },
            {
              userId: "mock-user-id-2",
              heroesSelected: ["cleric"],
              isReady: true,
            },
          ],
          heroesAvailable: [
            { id: "warrior", pickedBy: "mock-user-id" },
            { id: "cleric", pickedBy: "mock-user-id-2" },
            { id: "thief" },
          ],
        } as unknown as LobbyEntity);

      await expect(useCase.execute(mockParams)).rejects.toThrowError(
        ForbiddenException,
      );

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).not.toHaveBeenCalled();
      expect(eventEmitterMock).not.toHaveBeenCalled();
    });
  });
});
