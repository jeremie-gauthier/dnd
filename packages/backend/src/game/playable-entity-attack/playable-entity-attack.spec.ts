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
import { PlayableEntityAttackRepository } from "./playable-entity-attack.repository";
import { PlayableEntityAttackUseCase } from "./playable-entity-attack.uc";

describe("PlayableEntityAttackUseCase", () => {
  let useCase: PlayableEntityAttackUseCase;
  let repository: PlayableEntityAttackRepository;
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
        {
          provide: CombatService,
          useValue: {},
        },
        {
          provide: PlayableEntityAttackRepository,
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
    repository = module.get(PlayableEntityAttackRepository);
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