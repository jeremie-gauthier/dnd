import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import { MockInstance, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PrivateGetUserRepository } from './private-get-user.repository';
import { PrivateGetUserUseCase } from './private-get-user.uc';

describe('PrivateGetUserUseCase', () => {
  let useCase: PrivateGetUserUseCase;
  let repository: PrivateGetUserRepository;
  let eventEmitter2: EventEmitter2;

  let eventEmitterMock: MockInstance<[event: any, ...values: any[]], Promise<any[]>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PrivateGetUserUseCase,
        EventEmitter2,
        {
          provide: PrivateGetUserRepository,
          useValue: {},
        },
      ],
    }).compile();

    useCase = module.get<PrivateGetUserUseCase>(PrivateGetUserUseCase);
    repository = module.get<PrivateGetUserRepository>(PrivateGetUserRepository);
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

  describe('Happy path', () => {});

  describe('Negative path', () => {});
});
