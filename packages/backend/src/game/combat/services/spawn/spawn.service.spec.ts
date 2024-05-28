import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { SpawnService } from "./spawn.service";

describe("SpawnService", () => {
  let service: SpawnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpawnService],
    }).compile();

    service = module.get<SpawnService>(SpawnService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
