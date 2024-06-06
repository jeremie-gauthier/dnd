import { ConfigService } from "@nestjs/config";
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
import { PickGameMasterRepository } from "./pick-game-master.repository";
import { PickGameMasterUseCase } from "./pick-game-master.uc";

describe("PickGameMasterUseCase", () => {
  let useCase: PickGameMasterUseCase;
  let repository: PickGameMasterRepository;
  let backupService: BackupService;
  let eventEmitter2: EventEmitter2;

  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PickGameMasterUseCase,
        EventEmitter2,
        {
          provide: PickGameMasterRepository,
          useValue: {},
        },
        {
          provide: BackupService,
          useValue: {
            updateLobby: () => Promise.resolve(),
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

    useCase = module.get(PickGameMasterUseCase);
    backupService = module.get(BackupService);
    repository = module.get(PickGameMasterRepository);
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
    expect(backupService).toBeDefined();
  });
});
