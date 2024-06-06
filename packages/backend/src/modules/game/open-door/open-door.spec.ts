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
import { InitiativeService } from "../services/initiative/initiative.service";
import { SpawnService } from "../services/spawn/spawn.service";
import { TurnService } from "../services/turn/turn.service";
import { OpenDoorRepository } from "./open-door.repository";
import { OpenDoorUseCase } from "./open-door.uc";

describe("OpenDoorUseCase", () => {
  let useCase: OpenDoorUseCase;
  let repository: OpenDoorRepository;
  let eventEmitter2: EventEmitter2;

  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OpenDoorUseCase,
        EventEmitter2,
        InitiativeService,
        TurnService,
        {
          provide: OpenDoorRepository,
          useValue: {},
        },
        {
          provide: SpawnService,
          useValue: {
            spawnEnemies: vi.fn(),
          },
        },
        {
          provide: BackupService,
          useValue: {
            updateGame: vi.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(OpenDoorUseCase);
    repository = module.get(OpenDoorRepository);
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
