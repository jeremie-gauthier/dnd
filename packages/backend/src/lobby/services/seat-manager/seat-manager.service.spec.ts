import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { SeatManagerRepository } from "./seat-manager.repository";
import { SeatManagerService } from "./seat-manager.service";

describe("SeatManagerService", () => {
  let service: SeatManagerService;
  let eventEmitter2: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeatManagerService,
        EventEmitter2,
        {
          provide: SeatManagerRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get(SeatManagerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
