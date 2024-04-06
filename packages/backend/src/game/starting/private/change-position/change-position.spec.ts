import { Test } from "@nestjs/testing";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ChangePositionRepository } from "./change-position.repository";
import { ChangePositionUseCase } from "./change-position.uc";

describe("ChangePositionUseCase", () => {
  let useCase: ChangePositionUseCase;
  let repository: ChangePositionRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ChangePositionUseCase],
    }).compile();

    useCase = module.get<ChangePositionUseCase>(ChangePositionUseCase);
    repository = module.get<ChangePositionRepository>(ChangePositionRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe("Happy path", () => {});

  describe("Negative path", () => {});
});
