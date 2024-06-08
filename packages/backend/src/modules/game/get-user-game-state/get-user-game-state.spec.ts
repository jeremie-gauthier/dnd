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
import { PlayerStateService } from "../services/player-state/player-state.service";
import { GetUserGameStateUseCase } from "./get-user-game-state.uc";

describe("GetUserGameStateUseCase", () => {
  let useCase: GetUserGameStateUseCase;
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
          provide: PlayerStateService,
          useValue: {},
        },
        {
          provide: BackupService,
          useValue: {
            getGameOrThrow: vi.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get(GetUserGameStateUseCase);
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
