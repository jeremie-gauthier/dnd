import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { PlayableEntityService } from "./playable-entity.service";

describe("PlayableEntityService", () => {
  let service: PlayableEntityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayableEntityService],
    }).compile();

    service = module.get(PlayableEntityService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
