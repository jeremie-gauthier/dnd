import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { TurnService } from "./turn.service";

describe("TurnService", () => {
  let service: TurnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnService],
    }).compile();

    service = module.get<TurnService>(TurnService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
