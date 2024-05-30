import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BackupService } from "../backup/backup.service";
import { SeatManagerRepository } from "./seat-manager.repository";
import { SeatManagerService } from "./seat-manager.service";

describe("SeatManagerService", () => {
  let service: SeatManagerService;
  let backupService: BackupService;
  let eventEmitter2: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeatManagerService,
        {
          provide: BackupService,
          useValue: {
            updateLobby: () => Promise.resolve(),
          },
        },
        {
          provide: SeatManagerRepository,
          useValue: {
            getLobbyById: vi.fn(),
            delLobbyById: vi.fn(),
            delGameById: vi.fn(),
          },
        },
        EventEmitter2,
      ],
    }).compile();

    service = module.get(SeatManagerService);
    backupService = module.get(BackupService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(backupService).toBeDefined();
  });
});
