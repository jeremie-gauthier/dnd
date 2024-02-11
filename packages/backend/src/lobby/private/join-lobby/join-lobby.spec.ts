import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import type { MessageContext } from 'src/types/socket.type';
import { MockInstance, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { JoinLobbyRepository } from './join-lobby.repository';
import { JoinLobbyUseCase } from './join-lobby.uc';

describe('StartGameUseCase', () => {
  let useCase: JoinLobbyUseCase;
  let repository: JoinLobbyRepository;
  let eventEmitter2: EventEmitter2;

  let eventEmitterMock: MockInstance<[event: any, ...values: any[]], Promise<any[]>>;

  const mockParams = {
    ctx: {} as MessageContext,
    userId: 'mock-user-id',
    lobbyId: 'mock-lobby-id',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JoinLobbyUseCase,
        EventEmitter2,
        {
          provide: JoinLobbyRepository,
          useValue: {
            getLobbyById: () => Promise.resolve(null),
            addPlayerToLobby: () => Promise.resolve(),
          },
        },
      ],
    }).compile();

    useCase = module.get<JoinLobbyUseCase>(JoinLobbyUseCase);
    repository = module.get<JoinLobbyRepository>(JoinLobbyRepository);
    eventEmitter2 = module.get<EventEmitter2>(EventEmitter2);

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
});
