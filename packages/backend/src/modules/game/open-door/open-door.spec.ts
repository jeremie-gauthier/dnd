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
import { CoordService } from "../services/coord/coord.service";
import { InitiativeService } from "../services/initiative/initiative.service";
import { MapService } from "../services/map/map.service";
import { PlayableEntityService } from "../services/playable-entity/playable-entity.service";
import { SpawnService } from "../services/spawn/spawn.service";
import { TurnService } from "../services/turn/turn.service";
import { OpenDoorUseCase } from "./open-door.uc";

describe("OpenDoorUseCase", () => {
  let useCase: OpenDoorUseCase;
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
        PlayableEntityService,
        MapService,
        CoordService,
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
