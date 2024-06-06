import { LobbyEntityStatus, type LobbyEntity } from "@dnd/shared";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
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
import { RoleService } from "../services/role/role.service";
import { SeatManagerRepository } from "../services/seat-manager/seat-manager.repository";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";
import { DiscardHeroUseCase } from "./discard-hero.uc";

describe("DiscardHeroUseCase", () => {
  let useCase: DiscardHeroUseCase;
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
    heroId: "mock-hero-id",
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DiscardHeroUseCase,
        EventEmitter2,
        RoleService,
        SeatManagerService,
        {
          provide: SeatManagerRepository,
          useValue: {
            delLobbyById: vi.fn(),
            delGameById: vi.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: (key: string) => key,
          },
        },
        {
          provide: BackupService,
          useValue: {
            updateLobby: () => Promise.resolve(),
            getLobbyOrThrow: vi.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(DiscardHeroUseCase);
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
  });

  describe("Happy path", () => {
    it("should remove the selected hero from the user that is alone in the lobby", async () => {
      const getLobbyByIdMock = vi
        .spyOn(backupService, "getLobbyOrThrow")
        .mockResolvedValue({
          id: "mock-lobby-id",
          players: [{ userId: "mock-user-id", heroesSelected: ["warrior"] }],
          heroesAvailable: [
            { id: "warrior", pickedBy: "mock-user-id" },
            { id: "cleric" },
            { id: "thief" },
          ],
          status: LobbyEntityStatus.OPENED,
        } as unknown as LobbyEntity);

      await useCase.execute({ ...mockParams, heroId: "warrior" });

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledWith({
        lobby: {
          id: "mock-lobby-id",
          players: [{ userId: "mock-user-id", heroesSelected: [] }],
          heroesAvailable: [
            { id: "warrior" },
            { id: "cleric" },
            { id: "thief" },
          ],
          status: LobbyEntityStatus.OPENED,
        },
      });
    });

    it("should remove the selected hero from the user that is in the lobby with other users", async () => {
      const getLobbyByIdMock = vi
        .spyOn(backupService, "getLobbyOrThrow")
        .mockResolvedValue({
          id: "mock-lobby-id",
          players: [
            { userId: "mock-user-id", heroesSelected: ["cleric"] },
            {
              userId: "mock-another-user-id-1",
              heroesSelected: ["warrior", "thief"],
            },
            { userId: "mock-another-user-id-2", heroesSelected: [] },
          ],
          heroesAvailable: [
            { id: "warrior", pickedBy: "mock-another-user-id-1" },
            { id: "cleric", pickedBy: "mock-user-id" },
            { id: "thief", pickedBy: "mock-another-user-id-1" },
          ],
          status: LobbyEntityStatus.OPENED,
        } as unknown as LobbyEntity);

      await useCase.execute({ ...mockParams, heroId: "cleric" });

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledWith({
        lobby: {
          id: "mock-lobby-id",
          players: [
            { userId: "mock-user-id", heroesSelected: [] },
            {
              userId: "mock-another-user-id-1",
              heroesSelected: ["warrior", "thief"],
            },
            { userId: "mock-another-user-id-2", heroesSelected: [] },
          ],
          heroesAvailable: [
            { id: "warrior", pickedBy: "mock-another-user-id-1" },
            { id: "cleric" },
            { id: "thief", pickedBy: "mock-another-user-id-1" },
          ],
          status: LobbyEntityStatus.OPENED,
        },
      });
    });
  });

  describe("Negative path", () => {
    it("should throw a NotFoundException when the lobby does not exists", async () => {
      const getLobbyByIdMock = vi
        .spyOn(backupService, "getLobbyOrThrow")
        .mockRejectedValue(new NotFoundException());

      await expect(useCase.execute(mockParams)).rejects.toThrowError(
        NotFoundException,
      );

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).not.toHaveBeenCalled();
      expect(eventEmitterMock).not.toHaveBeenCalled();
    });

    it("should throw a ForbiddenException when the lobby is no longer opened", async () => {
      const getLobbyByIdMock = vi
        .spyOn(backupService, "getLobbyOrThrow")
        .mockResolvedValue({
          id: "mock-lobby-id",
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
        .spyOn(backupService, "getLobbyOrThrow")
        .mockResolvedValue({
          id: "mock-lobby-id",
          players: [{ userId: "mock-another-user-id", heroesSelected: [] }],
          heroesAvailable: [{ id: "warrior" }],
          status: LobbyEntityStatus.OPENED,
        } as unknown as LobbyEntity);

      await expect(
        useCase.execute({ ...mockParams, heroId: "warrior" }),
      ).rejects.toThrowError(ForbiddenException);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).not.toHaveBeenCalled();
      expect(eventEmitterMock).not.toHaveBeenCalled();
    });

    it("should throw a NotFoundException when the hero does not exists", async () => {
      const getLobbyByIdMock = vi
        .spyOn(backupService, "getLobbyOrThrow")
        .mockResolvedValue({
          id: "mock-lobby-id",
          players: [{ userId: "mock-user-id", heroesSelected: ["warrior"] }],
          heroesAvailable: [
            { id: "warrior", pickedBy: "mock-user-id" },
            { id: "cleric" },
            { id: "thief" },
          ],
          status: LobbyEntityStatus.OPENED,
        } as unknown as LobbyEntity);

      await expect(
        useCase.execute({ ...mockParams, heroId: "superman" }),
      ).rejects.toThrowError(NotFoundException);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).not.toHaveBeenCalled();
      expect(eventEmitterMock).not.toHaveBeenCalled();
    });

    it("should throw a ForbiddenException when the hero belongs to another user", async () => {
      const getLobbyByIdMock = vi
        .spyOn(backupService, "getLobbyOrThrow")
        .mockResolvedValue({
          id: "mock-lobby-id",
          players: [
            { userId: "mock-user-id", heroesSelected: [] },
            { userId: "mock-another-user-id", heroesSelected: ["warrior"] },
          ],
          heroesAvailable: [
            { id: "warrior", pickedBy: "mock-another-user-id" },
          ],
          status: LobbyEntityStatus.OPENED,
        } as unknown as LobbyEntity);

      await expect(
        useCase.execute({ ...mockParams, heroId: "warrior" }),
      ).rejects.toThrowError(ForbiddenException);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).not.toHaveBeenCalled();
      expect(eventEmitterMock).not.toHaveBeenCalled();
    });

    it("should throw a ForbiddenException when the user has declared ready", async () => {
      const getLobbyByIdMock = vi
        .spyOn(backupService, "getLobbyOrThrow")
        .mockResolvedValue({
          id: "mock-lobby-id",
          players: [
            {
              userId: "mock-user-id",
              isReady: true,
              heroesSelected: ["warrior"],
            },
          ],
          heroesAvailable: [{ id: "warrior", pickedBy: "mock-user-id" }],
          status: LobbyEntityStatus.OPENED,
        } as unknown as LobbyEntity);

      await expect(
        useCase.execute({ ...mockParams, heroId: "warrior" }),
      ).rejects.toThrowError(ForbiddenException);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).not.toHaveBeenCalled();
      expect(eventEmitterMock).not.toHaveBeenCalled();
    });
  });
});
