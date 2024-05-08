import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PlayableEntityRepository } from "./playable-entity.repository";
import { PlayableEntityService } from "./playable-entity.service";

describe("PlayableEntityService", () => {
  let service: PlayableEntityService;
  let repository: PlayableEntityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayableEntityService,
        {
          provide: PlayableEntityRepository,
          useValue: {
            getEnemiesByNames: vi.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(PlayableEntityService);
    repository = module.get(PlayableEntityRepository);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
