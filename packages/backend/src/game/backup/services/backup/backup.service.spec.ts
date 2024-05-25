import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { BackupService } from "./backup.service";

describe("GameService", () => {
  let service: BackupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackupService],
    }).compile();

    service = module.get(BackupService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
