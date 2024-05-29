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
import { BackupService } from "../services/backup/backup.service";
import { CombatService } from "../services/combat/combat.service";
import { CoordService } from "../services/coord/coord.service";
import { MoveService } from "../services/move/move.service";
import { TrapService } from "../services/trap/trap.service";
import { PlayableEntityMoveRepository } from "./playable-entity-move.repository";
import { PlayableEntityMoveUseCase } from "./playable-entity-move.uc";

describe("PlayableEntityMoveUseCase", () => {
  let useCase: PlayableEntityMoveUseCase;
  let repository: PlayableEntityMoveRepository;
  let eventEmitter2: EventEmitter2;
  let moveSerivce: MoveService;
  let trapService: TrapService;
  let coordService: CoordService;

  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PlayableEntityMoveUseCase,
        EventEmitter2,
        TrapService,
        CoordService,
        {
          provide: CombatService,
          useValue: {},
        },
        {
          provide: PlayableEntityMoveRepository,
          useValue: {},
        },
        {
          provide: MoveService,
          useValue: {},
        },
        {
          provide: BackupService,
          useValue: {
            updateGame: vi.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(PlayableEntityMoveUseCase);
    repository = module.get(PlayableEntityMoveRepository);
    eventEmitter2 = module.get(EventEmitter2);
    moveSerivce = module.get(MoveService);
    trapService = module.get(TrapService);
    coordService = module.get(CoordService);

    eventEmitterMock = vi.spyOn(eventEmitter2, "emitAsync");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
    expect(eventEmitter2).toBeDefined();
    expect(moveSerivce).toBeDefined();
    expect(trapService).toBeDefined();
    expect(coordService).toBeDefined();
  });
});
