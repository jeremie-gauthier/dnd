import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import {
  MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CombatService } from "../combat/combat.service";
import { CoordService } from "../coord/coord.service";
import { TrapService } from "./trap.service";

describe("TrapService", () => {
  let service: TrapService;
  let eventEmitter2: EventEmitter2;

  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrapService,
        CoordService,
        {
          provide: CombatService,
          useValue: {},
        },
        EventEmitter2,
      ],
    }).compile();

    service = module.get(TrapService);
    eventEmitter2 = module.get(EventEmitter2);

    eventEmitterMock = vi.spyOn(eventEmitter2, "emitAsync");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(eventEmitter2).toBeDefined();
  });
});
