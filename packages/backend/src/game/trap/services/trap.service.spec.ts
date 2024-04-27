import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { TrapService } from "./trap.service";

describe("TrapService", () => {
  let service: TrapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrapService],
    }).compile();

    service = module.get<TrapService>(TrapService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
