import { LobbyEntity, LobbyEntityStatus } from '@dnd/shared';
import { ForbiddenException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import { LobbyChangedPayload } from 'src/lobby/events/emitters/lobby-changed.payload';
import { LobbyEvent } from 'src/lobby/events/emitters/lobby-events.enum';
import { LobbyGameInitializingPayload } from 'src/lobby/events/emitters/lobby-game-started.payload';
import type { MessageContext } from 'src/types/socket.type';
import { MockInstance, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StartGameRepository } from './start-game.repository';
import { StartGameUseCase } from './start-game.uc';

describe('StartGameUseCase', () => {
  let useCase: StartGameUseCase;
  let repository: StartGameRepository;
  let eventEmitter2: EventEmitter2;

  let updateLobbyMock: MockInstance<[lobby: LobbyEntity], Promise<void>>;
  let eventEmitterMock: MockInstance<[event: any, ...values: any[]], Promise<any[]>>;

  const mockParams = {
    ctx: {} as MessageContext,
    userId: 'mock-user-id',
    lobbyId: 'mock-lobby-id',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StartGameUseCase,
        EventEmitter2,
        {
          provide: StartGameRepository,
          useValue: {
            getLobbyById: () => Promise.resolve(null),
            updateLobby: () => Promise.resolve(),
            createGame: () => Promise.resolve({}),
          },
        },
      ],
    }).compile();

    useCase = module.get<StartGameUseCase>(StartGameUseCase);
    repository = module.get<StartGameRepository>(StartGameRepository);
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

  describe('Happy path', async () => {
    it('should set the lobby as ready for a game when everyone is ready', async () => {
      const getLobbyByIdMock = vi.spyOn(repository, 'getLobbyById').mockResolvedValue({
        id: 'mock-lobby-id',
        status: LobbyEntityStatus.OPENED,
        config: {
          campaign: {
            id: 'mock-campaign-id',
            stage: {
              id: 'mock-stage-id',
            },
          },
        },
        host: {
          userId: 'mock-user-id',
        },
        players: [
          { userId: 'mock-user-id', heroesSelected: ['warrior'], isReady: true },
          { userId: 'mock-user-id-2', heroesSelected: ['cleric'], isReady: true },
          { userId: 'mock-user-id-3', heroesSelected: ['thief'], isReady: true },
        ],
        heroesAvailable: [
          { id: 'warrior', pickedBy: 'mock-user-id' },
          { id: 'cleric', pickedBy: 'mock-user-id-2' },
          { id: 'thief', pickedBy: 'mock-user-id-3' },
        ],
      } as LobbyEntity);

      await useCase.execute(mockParams);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).toHaveBeenCalledWith({
        id: 'mock-lobby-id',
        status: LobbyEntityStatus.GAME_INITIALIZING,
        config: {
          campaign: {
            id: 'mock-campaign-id',
            stage: {
              id: 'mock-stage-id',
            },
          },
        },
        host: {
          userId: 'mock-user-id',
        },
        players: [
          { userId: 'mock-user-id', heroesSelected: ['warrior'], isReady: true },
          { userId: 'mock-user-id-2', heroesSelected: ['cleric'], isReady: true },
          { userId: 'mock-user-id-3', heroesSelected: ['thief'], isReady: true },
        ],
        heroesAvailable: [
          { id: 'warrior', pickedBy: 'mock-user-id' },
          { id: 'cleric', pickedBy: 'mock-user-id-2' },
          { id: 'thief', pickedBy: 'mock-user-id-3' },
        ],
      });

      expect(eventEmitterMock).toHaveBeenCalledTimes(2);
      expect(eventEmitterMock).toHaveBeenCalledWith(
        LobbyEvent.LobbyChanged,
        new LobbyChangedPayload({ ctx: mockParams.ctx, lobbyId: mockParams.lobbyId }),
      );
      expect(eventEmitterMock).toHaveBeenCalledWith(
        LobbyEvent.LobbyGameInitializing,
        new LobbyGameInitializingPayload({
          ctx: mockParams.ctx,
          lobbyId: mockParams.lobbyId,
          userId: mockParams.userId,
          campaignId: 'mock-campaign-id',
          stageId: 'mock-stage-id',
        }),
      );
    });
  });

  describe('Negative path', () => {
    it('should throw a ForbiddenException if some players are not ready', async () => {
      const getLobbyByIdMock = vi.spyOn(repository, 'getLobbyById').mockResolvedValue({
        id: 'mock-lobby-id',
        status: 'preparing',
        players: [
          { userId: 'mock-user-id', heroesSelected: ['warrior'], isReady: true },
          { userId: 'mock-user-id-2', heroesSelected: ['cleric'], isReady: false },
        ],
        heroesAvailable: [
          { id: 'warrior', pickedBy: 'mock-user-id' },
          { id: 'cleric', pickedBy: 'mock-user-id-2' },
        ],
      } as unknown as LobbyEntity);

      await expect(useCase.execute(mockParams)).rejects.toThrowError(ForbiddenException);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).not.toHaveBeenCalled();
      expect(eventEmitterMock).not.toHaveBeenCalled();
    });

    it('should throw a ForbiddenException if some heroes are not picked', async () => {
      const getLobbyByIdMock = vi.spyOn(repository, 'getLobbyById').mockResolvedValue({
        id: 'mock-lobby-id',
        status: 'preparing',
        players: [
          { userId: 'mock-user-id', heroesSelected: ['warrior'], isReady: true },
          { userId: 'mock-user-id-2', heroesSelected: ['cleric'], isReady: true },
        ],
        heroesAvailable: [
          { id: 'warrior', pickedBy: 'mock-user-id' },
          { id: 'cleric', pickedBy: 'mock-user-id-2' },
          { id: 'thief' },
        ],
      } as unknown as LobbyEntity);

      await expect(useCase.execute(mockParams)).rejects.toThrowError(ForbiddenException);

      expect(getLobbyByIdMock).toHaveBeenCalledOnce();
      expect(updateLobbyMock).not.toHaveBeenCalled();
      expect(eventEmitterMock).not.toHaveBeenCalled();
    });
  });
});
