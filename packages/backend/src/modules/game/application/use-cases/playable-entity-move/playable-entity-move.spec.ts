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
import { BackupService } from "../../../domain/backup/backup.service";
import { CombatService } from "../../../domain/combat/combat.service";
import { CoordService } from "../../../domain/coord/coord.service";
import { MapService } from "../../../domain/map/map.service";
import { MoveService } from "../../../domain/move/move.service";
import { PlayableEntityService } from "../../../domain/playable-entity/playable-entity.service";
import { TrapService } from "../../../domain/trap/trap.service";
import { PlayableEntityMoveUseCase } from "./playable-entity-move.uc";

describe("PlayableEntityMoveUseCase", () => {
  let useCase: PlayableEntityMoveUseCase;
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
        PlayableEntityService,
        MapService,
        CoordService,
        {
          provide: CombatService,
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
    expect(eventEmitter2).toBeDefined();
    expect(moveSerivce).toBeDefined();
    expect(trapService).toBeDefined();
    expect(coordService).toBeDefined();
  });
});
