import { Test, TestingModule } from "@nestjs/testing";
import { MapModule } from "src/game/map/map.module";
import { CoordService } from "src/game/map/services/coord/coord.service";
import { MapService } from "src/game/map/services/map/map.service";
import { VisibilityService } from "src/game/map/services/visibility/visibility.service";
import { beforeEach, describe, expect, it } from "vitest";
import { PlayerStateService } from "./player-state.service";

describe("PlayerStateService", () => {
  let service: PlayerStateService;
  let visibilityService: VisibilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MapModule],
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
