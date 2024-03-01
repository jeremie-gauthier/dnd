import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test } from "@nestjs/testing";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ChangePositionRepository } from "./change-position.repository";
import { ChangePositionUseCase } from "./change-position.uc";

describe("ChangePositionUseCase", () => {
  let useCase: ChangePositionUseCase;
  let repository: ChangePositionRepository;
  let eventEmitter2: EventEmitter2;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ChangePositionUseCase,
        EventEmitter2,
        {
          provide: ChangePositionRepository,
          useValue: {},
        },
      ],
    }).compile();

    useCase = module.get<ChangePositionUseCase>(ChangePositionUseCase);
    repository = module.get<ChangePositionRepository>(ChangePositionRepository);
    eventEmitter2 = module.get<EventEmitter2>(EventEmitter2);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
    expect(eventEmitter2).toBeDefined();
  });

  describe("Happy path", () => {});

  describe("Negative path", () => {});
});
