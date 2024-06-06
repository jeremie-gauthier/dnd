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
import { MapService } from "../services/map/map.service";
import { PlayableEntityService } from "../services/playable-entity/playable-entity.service";
import { PlayableEntityAttackUseCase } from "./playable-entity-attack.uc";

describe("PlayableEntityAttackUseCase", () => {
  let useCase: PlayableEntityAttackUseCase;
  let eventEmitter2: EventEmitter2;

  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PlayableEntityAttackUseCase,
        EventEmitter2,
        CoordService,
        PlayableEntityService,
        MapService,
        {
          provide: CombatService,
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

    useCase = module.get(PlayableEntityAttackUseCase);
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
