import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CoordService } from "../coord/coord.service";
import { MapService } from "../map/map.service";
import { MoveService } from "../move/move.service";
import { PlayableEntityService } from "../playable-entity/playable-entity.service";
import { SpawnService } from "./spawn.service";

describe("SpawnService", () => {
  let service: SpawnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpawnService,
        EventEmitter2,
        {
          provide: PlayableEntityService,
          useValue: {
            createEnemies: vi.fn(),
          },
        },
        {
          provide: MoveService,
          useValue: {
            canMoveToRequestedPosition: vi.fn(),
          },
        },
        CoordService,
        MapService,
      ],
    }).compile();

    service = module.get<SpawnService>(SpawnService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
