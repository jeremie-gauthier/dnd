import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { MovesService } from "./moves.service";

describe("MovesService", () => {
  let service: MovesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovesService],
    }).compile();

    service = module.get<MovesService>(MovesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
