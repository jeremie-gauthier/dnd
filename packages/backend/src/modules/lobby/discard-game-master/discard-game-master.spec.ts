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
import { DiscardGameMasterRepository } from "./discard-game-master.repository";
import { DiscardGameMasterUseCase } from "./discard-game-master.uc";

describe("DiscardGameMasterUseCase", () => {
  let useCase: DiscardGameMasterUseCase;
  let backupService: BackupService;
  let repository: DiscardGameMasterRepository;
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
        {
          provide: DiscardGameMasterRepository,
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

    useCase = module.get(DiscardGameMasterUseCase);
    backupService = module.get(BackupService);
    repository = module.get(DiscardGameMasterRepository);
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
