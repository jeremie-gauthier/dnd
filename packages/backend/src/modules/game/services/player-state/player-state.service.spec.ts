import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { CoordService } from "../coord/coord.service";
import { MapService } from "../map/map.service";
import { VisibilityService } from "../visibility/visibility.service";
import { PlayerStateService } from "./player-state.service";

describe("PlayerStateService", () => {
  let service: PlayerStateService;
  let visibilityService: VisibilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerStateService,
        CoordService,
        MapService,
        VisibilityService,
      ],
    }).compile();

    service = module.get(PlayerStateService);
    visibilityService = module.get(VisibilityService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(visibilityService).toBeDefined();
  });
});
