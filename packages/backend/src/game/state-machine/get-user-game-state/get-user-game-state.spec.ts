import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test } from "@nestjs/testing";
import {
  MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { GetUserGameStateRepository } from "./get-user-game-state.repository";
import { GetUserGameStateUseCase } from "./get-user-game-state.uc";

describe("GetUserGameStateUseCase", () => {
  let useCase: GetUserGameStateUseCase;
  let repository: GetUserGameStateRepository;
  let eventEmitter2: EventEmitter2;

  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetUserGameStateUseCase,
        EventEmitter2,
        {
          provide: GetUserGameStateRepository,
          useValue: {},
        },
      ],
    }).compile();

    useCase = module.get<GetUserGameStateUseCase>(GetUserGameStateUseCase);
    repository = module.get<GetUserGameStateRepository>(
      GetUserGameStateRepository,
    );
    eventEmitter2 = module.get<EventEmitter2>(EventEmitter2);

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

  describe("Happy path", () => {});

  describe("Negative path", () => {});
});
