import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test } from "@nestjs/testing";
import {
  MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { MovesService } from "../services/moves.service";
import { PlayableEntityMoveRepository } from "./playable-entity-move.repository";
import { PlayableEntityMoveUseCase } from "./playable-entity-move.uc";

describe("PlayableEntityMoveUseCase", () => {
  let useCase: PlayableEntityMoveUseCase;
  let repository: PlayableEntityMoveRepository;
  let eventEmitter2: EventEmitter2;
  let movesSerivce: MovesService;

  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PlayableEntityMoveUseCase,
        EventEmitter2,
        {
          provide: PlayableEntityMoveRepository,
          useValue: {},
        },
        {
          provide: MovesService,
          useValue: {},
        },
      ],
    }).compile();

    useCase = module.get(PlayableEntityMoveUseCase);
    repository = module.get(PlayableEntityMoveRepository);
    eventEmitter2 = module.get(EventEmitter2);
    movesSerivce = module.get(MovesService);

    eventEmitterMock = vi.spyOn(eventEmitter2, "emitAsync");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
    expect(eventEmitter2).toBeDefined();
    expect(movesSerivce).toBeDefined();
  });
});
