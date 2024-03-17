import { LobbyEntityStatus, type LobbyEntity } from "@dnd/shared";
import { ForbiddenException, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test } from "@nestjs/testing";
import { LobbyChangedPayload } from "src/lobby/events/emitters/lobby-changed.payload";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-events.enum";
import type { MessageContext } from "src/types/socket.type";
import {
  type MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { DiscardHeroRepository } from "./discard-hero.repository";
import { DiscardHeroUseCase } from "./discard-hero.uc";

describe("DiscardHeroUseCase", () => {
  let useCase: DiscardHeroUseCase;
  let repository: DiscardHeroRepository;
  let eventEmitter2: EventEmitter2;

  let updateLobbyMock: MockInstance<[lobby: LobbyEntity], Promise<void>>;
  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  const mockParams = {
    ctx: {} as MessageContext,
    userId: "mock-user-id",
    lobbyId: "mock-lobby-id",
    heroId: "mock-hero-id",
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DiscardHeroUseCase,
        EventEmitter2,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: (key: string) => key,
          },
        },
        {
          provide: DiscardHeroRepository,
          useValue: {
            getLobbyById: () => Promise.resolve(null),
            updateLobby: () => Promise.resolve(),
          },
        },
      ],
    }).compile();

    useCase = module.get<DiscardHeroUseCase>(DiscardHeroUseCase);
    repository = module.get<DiscardHeroRepository>(DiscardHeroRepository);
    eventEmitter2 = module.get<EventEmitter2>(EventEmitter2);

    updateLobbyMock = vi.spyOn(repository, "updateLobby");
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
    it("should remove the selected hero from the user that is alone in the lobby", async () => {
      const getLobbyByIdMock = vi
        .spyOn(repository, "getLobbyById")
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
        id: "mock-lobby-id",
        players: [{ userId: "mock-user-id", heroesSelected: [] }],
        heroesAvailable: [{ id: "warrior" }, { id: "cleric" }, { id: "thief" }],
        status: LobbyEntityStatus.OPENED,
      });
      expect(eventEmitterMock).toHaveBeenCalledOnce();
      expect(eventEmitterMock).toHaveBeenCalledWith(
        LobbyEvent.LobbyChanged,
        new LobbyChangedPayload({
          ctx: mockParams.ctx,
          lobbyId: mockParams.lobbyId,
        }),
      );
    });

    it("should remove the selected hero from the user that is in the lobby with other users", async () => {
      const getLobbyByIdMock = vi
        .spyOn(repository, "getLobbyById")
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
      });
      expect(eventEmitterMock).toHaveBeenCalledOnce();
      expect(eventEmitterMock).toHaveBeenCalledWith(
        LobbyEvent.LobbyChanged,
        new LobbyChangedPayload({
          ctx: mockParams.ctx,
          lobbyId: mockParams.lobbyId,
        }),
      );
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
        .spyOn(repository, "getLobbyById")
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
        .spyOn(repository, "getLobbyById")
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
  });
});
