import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BackupRepository } from "./backup.repository";
import { BackupService } from "./backup.service";

describe("Game BackupService", () => {
  let service: BackupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BackupService,
        EventEmitter2,
        {
          provide: BackupRepository,
          useValue: {
            updateGame: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(BackupService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
