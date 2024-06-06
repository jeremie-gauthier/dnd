import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CoordService } from "../coord/coord.service";
import { MoveService } from "./move.service";

describe("MovesService", () => {
  let service: MoveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoveService,
        {
          provide: CoordService,
          useValue: {
            coordToIndex: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(MoveService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
