import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { JoinLobbyRepository } from './join-lobby.repository';
import { JoinLobbyUseCase } from './join-lobby.uc';

describe('StartGameUseCase', () => {
  let useCase: JoinLobbyUseCase;
  let repository: JoinLobbyRepository;
  let eventEmitter2: EventEmitter2;

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
