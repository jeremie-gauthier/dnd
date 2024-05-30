import { LobbyEntityStatus, type LobbyEntity } from "@dnd/shared";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test } from "@nestjs/testing";
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
import { TogglePlayerReadyStateRepository } from "./toggle-player-ready-state.repository";
import { TogglePlayerReadyStateUseCase } from "./toggle-player-ready-state.uc";

describe("TogglePlayerReadyStateUseCase", () => {
  let useCase: TogglePlayerReadyStateUseCase;
  let backupService: BackupService;
  let repository: TogglePlayerReadyStateRepository;
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
        TogglePlayerReadyStateUseCase,
        EventEmitter2,
        {
          provide: BackupService,
          useValue: {
            updateLobby: () => Promise.resolve(),
          },
        },
        {
          provide: TogglePlayerReadyStateRepository,
          useValue: {
            getLobbyById: () => Promise.resolve(null),
          },
        },
      ],
    }).compile();

    useCase = module.get(TogglePlayerReadyStateUseCase);
    backupService = module.get(BackupService);
    repository = module.get(TogglePlayerReadyStateRepository);
    eventEmitter2 = module.get(EventEmitter2);

    updateLobbyMock = vi.spyOn(backupService, "updateLobby");
    eventEmitterMock = vi.spyOn(eventEmitter2, "emitAsync");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
    expect(eventEmitter2).toBeDefined();
  });

  describe("Happy path", () => {
    it("should toggle the user's ready state from false to true when alone in the lobby", async () => {
      const getLobbyByIdMock = vi
        .spyOn(repository, "getLobbyById")
        .mockResolvedValue({
          id: "mock-lobby-id",
          players: [{ userId: "mock-user-id", isReady: false }],
          status: LobbyEntityStatus.OPENED,
        } as unknown as LobbyEntity);

      await useCase.execute(mockParams);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledWith({
        lobby: {
          id: "mock-lobby-id",
          players: [{ userId: "mock-user-id", isReady: true }],
          status: LobbyEntityStatus.OPENED,
        },
      });
    });

    it("should toggle the user's ready state from true to false when alone in the lobby", async () => {
      const getLobbyByIdMock = vi
        .spyOn(repository, "getLobbyById")
        .mockResolvedValue({
          id: "mock-lobby-id",
          players: [{ userId: "mock-user-id", isReady: true }],
          status: LobbyEntityStatus.OPENED,
        } as unknown as LobbyEntity);

      await useCase.execute(mockParams);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledWith({
        lobby: {
          id: "mock-lobby-id",
          players: [{ userId: "mock-user-id", isReady: false }],
          status: LobbyEntityStatus.OPENED,
        },
      });
    });

    it("should toggle the user's ready state from false to true when with other users in the lobby", async () => {
      const getLobbyByIdMock = vi
        .spyOn(repository, "getLobbyById")
        .mockResolvedValue({
          id: "mock-lobby-id",
          players: [
            { userId: "mock-user-id", isReady: false },
            { userId: "mock-another-user-id-that-is-ready", isReady: true },
            {
              userId: "mock-another-user-id-that-is-not-ready",
              isReady: false,
            },
          ],
          status: LobbyEntityStatus.OPENED,
        } as unknown as LobbyEntity);

      await useCase.execute(mockParams);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledWith({
        lobby: {
          id: "mock-lobby-id",
          players: [
            { userId: "mock-user-id", isReady: true },
            { userId: "mock-another-user-id-that-is-ready", isReady: true },
            {
              userId: "mock-another-user-id-that-is-not-ready",
              isReady: false,
            },
          ],
          status: LobbyEntityStatus.OPENED,
        },
      });
    });

    it("should toggle the user's ready state from true to false when with other users in the lobby", async () => {
      const getLobbyByIdMock = vi
        .spyOn(repository, "getLobbyById")
        .mockResolvedValue({
          id: "mock-lobby-id",
          players: [
            { userId: "mock-user-id", isReady: true },
            { userId: "mock-another-user-id-that-is-ready", isReady: true },
            {
              userId: "mock-another-user-id-that-is-not-ready",
              isReady: false,
            },
          ],
          status: LobbyEntityStatus.OPENED,
        } as unknown as LobbyEntity);

      await useCase.execute(mockParams);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledWith({
        lobby: {
          id: "mock-lobby-id",
          players: [
            { userId: "mock-user-id", isReady: false },
            { userId: "mock-another-user-id-that-is-ready", isReady: true },
            {
              userId: "mock-another-user-id-that-is-not-ready",
              isReady: false,
            },
          ],
          status: LobbyEntityStatus.OPENED,
        },
      });
    });
  });

  describe("Negative path", () => {
    it("should throw a NotFoundException when the lobby does not exists", async () => {
      const getLobbyByIdMock = vi.spyOn(repository, "getLobbyById");

      await expect(useCase.execute(mockParams)).rejects.toThrowError(
        NotFoundException,
      );

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).not.toHaveBeenCalled();
      expect(eventEmitterMock).not.toHaveBeenCalled();
    });

    it("should throw a ForbiddenException when the lobby is no longer opened", async () => {
      const getLobbyByIdMock = vi
        .spyOn(repository, "getLobbyById")
        .mockResolvedValue({
          id: "mock-lobby-id",
          players: [{ userId: "mock-another-user-id", isReady: false }],
          status: LobbyEntityStatus.GAME_INITIALIZING,
        } as unknown as LobbyEntity);

      await expect(useCase.execute(mockParams)).rejects.toThrowError(
        ForbiddenException,
      );

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).not.toHaveBeenCalled();
      expect(eventEmitterMock).not.toHaveBeenCalled();
    });

    it("should throw a ForbiddenException when the user is not in the lobby", async () => {
      const getLobbyByIdMock = vi
        .spyOn(repository, "getLobbyById")
        .mockResolvedValue({
          id: "mock-lobby-id",
          players: [{ userId: "mock-another-user-id", isReady: false }],
          status: LobbyEntityStatus.OPENED,
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
