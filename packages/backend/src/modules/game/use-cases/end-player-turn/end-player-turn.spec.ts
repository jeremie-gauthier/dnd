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
import { PlayableEntityService } from "../../domain/playable-entity/playable-entity.service";
import { TurnService } from "../../domain/turn/turn.service";
import { EndPlayerTurnUseCase } from "./end-player-turn.uc";

describe("EndPlayerTurnUseCase", () => {
  let useCase: EndPlayerTurnUseCase;
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
        TurnService,
        {
          provide: BackupService,
          useValue: {
            updateGame: vi.fn(),
          },
        },
        {
          provide: PlayableEntityService,
          useValue: {
            mustBeInActionPhase: vi.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(EndPlayerTurnUseCase);
    eventEmitter2 = module.get(EventEmitter2);

    eventEmitterMock = vi.spyOn(eventEmitter2, "emitAsync");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(eventEmitter2).toBeDefined();
  });
});
