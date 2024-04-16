import { Test, type TestingModule } from "@nestjs/testing";
import { CoordService } from "src/game/map/services/coord/coord.service";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MovesService } from "./moves.service";

describe("MovesService", () => {
  let service: MovesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovesService,
        {
          provide: CoordService,
          useValue: {
            coordToIndex: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MovesService>(MovesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
