import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { SeatManagerService } from "./seat-manager.service";

describe("SeatManagerService", () => {
  let service: SeatManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeatManagerService],
    }).compile();

    service = module.get<SeatManagerService>(SeatManagerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
