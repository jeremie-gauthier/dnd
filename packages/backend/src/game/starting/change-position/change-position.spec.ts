import { Test } from "@nestjs/testing";
import { CoordService } from "src/game/map/services/coord/coord.service";
import { MovesService } from "src/game/moves/services/moves.service";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ChangePositionRepository } from "./change-position.repository";
import { ChangePositionUseCase } from "./change-position.uc";

describe("ChangePositionUseCase", () => {
  let useCase: ChangePositionUseCase;
  let repository: ChangePositionRepository;
  let movesService: MovesService;
  let coordService: CoordService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ChangePositionUseCase,
        {
          provide: ChangePositionRepository,
          useValue: {
            getGameById: vi.fn().mockResolvedValue({}),
            updateGame: vi.fn(),
          },
        },
        {
          provide: CoordService,
          useValue: {
            coordToIndex: vi.fn(),
          },
        },
        {
          provide: MovesService,
          useValue: {
            moveHeroToRequestedPosition: vi.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ChangePositionUseCase>(ChangePositionUseCase);
    repository = module.get<ChangePositionRepository>(ChangePositionRepository);
    movesService = module.get(MovesService);
    coordService = module.get(CoordService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
    expect(movesService).toBeDefined();
    expect(coordService).toBeDefined();
  });
});
