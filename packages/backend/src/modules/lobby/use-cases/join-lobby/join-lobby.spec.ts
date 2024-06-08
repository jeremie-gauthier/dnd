import { Test } from "@nestjs/testing";
import { BackupService } from "src/modules/lobby/domain/backup/backup.service";
import { SeatManagerService } from "src/modules/lobby/domain/seat-manager/seat-manager.service";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { JoinLobbyUseCase } from "./join-lobby.uc";

describe("StartGameUseCase", () => {
  let useCase: JoinLobbyUseCase;
  let backupService: BackupService;
  let seatManagerService: SeatManagerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JoinLobbyUseCase,
        {
          provide: BackupService,
          useValue: {
            updateLobby: () => Promise.resolve(),
          },
        },
        {
          provide: SeatManagerService,
          useValue: {
            take: vi.fn().mockResolvedValue("fake-lobby-id"),
          },
        },
      ],
    }).compile();

    useCase = module.get(JoinLobbyUseCase);
    backupService = module.get(BackupService);
    seatManagerService = module.get(SeatManagerService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(backupService).toBeDefined();
    expect(seatManagerService).toBeDefined();
  });
});
