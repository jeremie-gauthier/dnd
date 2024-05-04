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
import { CoordService } from "../coord/coord.service";
import { MapService } from "./map.service";

describe("MapService", () => {
  let service: MapService;
  let coordService: CoordService;
  let eventEmitter2: EventEmitter2;

  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapService, CoordService, EventEmitter2],
    }).compile();

    service = module.get(MapService);
    coordService = module.get(CoordService);
    eventEmitter2 = module.get(EventEmitter2);

    eventEmitterMock = vi.spyOn(eventEmitter2, "emitAsync");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(coordService).toBeDefined();
    expect(eventEmitter2).toBeDefined();
  });
});
