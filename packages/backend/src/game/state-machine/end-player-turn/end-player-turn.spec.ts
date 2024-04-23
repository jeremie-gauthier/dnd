import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test } from "@nestjs/testing";
import { TurnService } from "src/game/timeline/services/turn/turn.service";
import {
  MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { EndPlayerTurnRepository } from "./end-player-turn.repository";
import { EndPlayerTurnUseCase } from "./end-player-turn.uc";

describe("EndPlayerTurnUseCase", () => {
  let useCase: EndPlayerTurnUseCase;
  let repository: EndPlayerTurnRepository;
  let eventEmitter2: EventEmitter2;

  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EndPlayerTurnUseCase,
        EventEmitter2,
        {
          provide: EndPlayerTurnRepository,
          useValue: {},
        },
        TurnService,
      ],
    }).compile();

    useCase = module.get<EndPlayerTurnUseCase>(EndPlayerTurnUseCase);
    repository = module.get<EndPlayerTurnRepository>(EndPlayerTurnRepository);
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
});
