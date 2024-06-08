import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test } from "@nestjs/testing";
import { PlayableEntityService } from "src/modules/game/domain/playable-entity/playable-entity.service";
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
import { SeatManagerRepository } from "../../domain/seat-manager/seat-manager.repository";
import { SeatManagerService } from "../../domain/seat-manager/seat-manager.service";
import { DiscardGameMasterUseCase } from "./discard-game-master.uc";

describe("DiscardGameMasterUseCase", () => {
  let useCase: DiscardGameMasterUseCase;
  let backupService: BackupService;
  let eventEmitter2: EventEmitter2;

  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DiscardGameMasterUseCase,
        EventEmitter2,
        PlayableEntityService,
        SeatManagerService,
        {
          provide: SeatManagerRepository,
          useValue: {
            delLobbyById: vi.fn(),
            delGameById: vi.fn(),
          },
        },
        {
          provide: BackupService,
          useValue: {
            updateLobby: () => Promise.resolve(),
            getLobbyOrThrow: vi.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: (key: string) => key,
          },
        },
      ],
    }).compile();

    useCase = module.get(DiscardGameMasterUseCase);
    backupService = module.get(BackupService);
    eventEmitter2 = module.get(EventEmitter2);

    eventEmitterMock = vi.spyOn(eventEmitter2, "emitAsync");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(eventEmitter2).toBeDefined();
    expect(backupService).toBeDefined();
  });
});
