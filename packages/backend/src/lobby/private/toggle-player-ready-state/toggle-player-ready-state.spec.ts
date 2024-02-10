import type { LobbyEntity } from '@dnd/shared';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import { LobbyChangedPayload } from 'src/lobby/events/emitters/lobby-changed.payload';
import { LobbyEvent } from 'src/lobby/events/emitters/lobby-events.enum';
import type { MessageContext } from 'src/types/socket.type';
import { MockInstance, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TogglePlayerReadyStateRepository } from './toggle-player-ready-state.repository';
import { TogglePlayerReadyStateUseCase } from './toggle-player-ready-state.uc';

describe('TogglePlayerReadyStateUseCase', () => {
  let useCase: TogglePlayerReadyStateUseCase;
  let repository: TogglePlayerReadyStateRepository;
  let eventEmitter2: EventEmitter2;

  let updateLobbyMock: MockInstance<[lobby: LobbyEntity], Promise<void>>;
  let eventEmitterMock: MockInstance<[event: any, ...values: any[]], Promise<any[]>>;

  const mockParams = {
    ctx: {} as MessageContext,
    userId: 'mock-user-id',
    lobbyId: 'mock-lobby-id',
    heroId: 'mock-hero-id',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TogglePlayerReadyStateUseCase,
        EventEmitter2,
        {
          provide: TogglePlayerReadyStateRepository,
          useValue: {
            getLobbyById: () => Promise.resolve(null),
            updateLobby: () => Promise.resolve(),
          },
        },
      ],
    }).compile();

    useCase = module.get<TogglePlayerReadyStateUseCase>(TogglePlayerReadyStateUseCase);
    repository = module.get<TogglePlayerReadyStateRepository>(TogglePlayerReadyStateRepository);
    eventEmitter2 = module.get<EventEmitter2>(EventEmitter2);

    updateLobbyMock = vi.spyOn(repository, 'updateLobby');
    eventEmitterMock = vi.spyOn(eventEmitter2, 'emitAsync');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
    expect(eventEmitter2).toBeDefined();
  });

  describe('Happy path', () => {
    it("should toggle the user's ready state from false to true when alone in the lobby", async () => {
      const getLobbyByIdMock = vi.spyOn(repository, 'getLobbyById').mockResolvedValue({
        id: 'mock-lobby-id',
        players: [{ userId: 'mock-user-id', isReady: false }],
      } as unknown as LobbyEntity);

      await useCase.execute(mockParams);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledWith({
        id: 'mock-lobby-id',
        players: [{ userId: 'mock-user-id', isReady: true }],
      });
      expect(eventEmitterMock).toHaveBeenCalledOnce();
      expect(eventEmitterMock).toHaveBeenCalledWith(
        LobbyEvent.LobbyChanged,
        new LobbyChangedPayload({ ctx: mockParams.ctx, lobbyId: mockParams.lobbyId }),
      );
    });

    it("should toggle the user's ready state from true to false when alone in the lobby", async () => {
      const getLobbyByIdMock = vi.spyOn(repository, 'getLobbyById').mockResolvedValue({
        id: 'mock-lobby-id',
        players: [{ userId: 'mock-user-id', isReady: true }],
      } as unknown as LobbyEntity);

      await useCase.execute(mockParams);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledWith({
        id: 'mock-lobby-id',
        players: [{ userId: 'mock-user-id', isReady: false }],
      });
      expect(eventEmitterMock).toHaveBeenCalledOnce();
      expect(eventEmitterMock).toHaveBeenCalledWith(
        LobbyEvent.LobbyChanged,
        new LobbyChangedPayload({ ctx: mockParams.ctx, lobbyId: mockParams.lobbyId }),
      );
    });

    it("should toggle the user's ready state from false to true when with other users in the lobby", async () => {
      const getLobbyByIdMock = vi.spyOn(repository, 'getLobbyById').mockResolvedValue({
        id: 'mock-lobby-id',
        players: [
          { userId: 'mock-user-id', isReady: false },
          { userId: 'mock-another-user-id-that-is-ready', isReady: true },
          { userId: 'mock-another-user-id-that-is-not-ready', isReady: false },
        ],
      } as unknown as LobbyEntity);

      await useCase.execute(mockParams);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledWith({
        id: 'mock-lobby-id',
        players: [
          { userId: 'mock-user-id', isReady: true },
          { userId: 'mock-another-user-id-that-is-ready', isReady: true },
          { userId: 'mock-another-user-id-that-is-not-ready', isReady: false },
        ],
      });
      expect(eventEmitterMock).toHaveBeenCalledOnce();
      expect(eventEmitterMock).toHaveBeenCalledWith(
        LobbyEvent.LobbyChanged,
        new LobbyChangedPayload({ ctx: mockParams.ctx, lobbyId: mockParams.lobbyId }),
      );
    });

    it("should toggle the user's ready state from true to false when with other users in the lobby", async () => {
      const getLobbyByIdMock = vi.spyOn(repository, 'getLobbyById').mockResolvedValue({
        id: 'mock-lobby-id',
        players: [
          { userId: 'mock-user-id', isReady: true },
          { userId: 'mock-another-user-id-that-is-ready', isReady: true },
          { userId: 'mock-another-user-id-that-is-not-ready', isReady: false },
        ],
      } as unknown as LobbyEntity);

      await useCase.execute(mockParams);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledWith({
        id: 'mock-lobby-id',
        players: [
          { userId: 'mock-user-id', isReady: false },
          { userId: 'mock-another-user-id-that-is-ready', isReady: true },
          { userId: 'mock-another-user-id-that-is-not-ready', isReady: false },
        ],
      });
      expect(eventEmitterMock).toHaveBeenCalledOnce();
      expect(eventEmitterMock).toHaveBeenCalledWith(
        LobbyEvent.LobbyChanged,
        new LobbyChangedPayload({ ctx: mockParams.ctx, lobbyId: mockParams.lobbyId }),
      );
    });
  });

  describe('Negative path', () => {
    it('should throw a NotFoundException when the lobby does not exists', async () => {
      const getLobbyByIdMock = vi.spyOn(repository, 'getLobbyById');

      await expect(useCase.execute(mockParams)).rejects.toThrowError(NotFoundException);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).not.toHaveBeenCalled();
      expect(eventEmitterMock).not.toHaveBeenCalled();
    });

    it('should throw a ForbiddenException when the user is not in the lobby', async () => {
      const getLobbyByIdMock = vi.spyOn(repository, 'getLobbyById').mockResolvedValue({
        id: 'mock-lobby-id',
        players: [{ userId: 'mock-another-user-id', isReady: false }],
      } as unknown as LobbyEntity);

      await expect(useCase.execute(mockParams)).rejects.toThrowError(ForbiddenException);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).not.toHaveBeenCalled();
      expect(eventEmitterMock).not.toHaveBeenCalled();
    });
  });
});
