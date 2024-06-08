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
import { BackupService } from "../../domain/backup/backup.service";
import { TurnService } from "../../domain/turn/turn.service";
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
          useValue: {
            getGameByUserId: vi.fn(),
            updateGame: vi.fn(),
          },
        },
        TurnService,
        {
          provide: BackupService,
          useValue: {
            updateGame: vi.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(EndPlayerTurnUseCase);
    repository = module.get(EndPlayerTurnRepository);
    eventEmitter2 = module.get(EventEmitter2);

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
