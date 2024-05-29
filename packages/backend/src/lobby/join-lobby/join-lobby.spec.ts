import { Test } from "@nestjs/testing";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";
import { JoinLobbyRepository } from "./join-lobby.repository";
import { JoinLobbyUseCase } from "./join-lobby.uc";

describe("StartGameUseCase", () => {
  let useCase: JoinLobbyUseCase;
  let seatManagerService: SeatManagerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JoinLobbyUseCase,
        {
          provide: JoinLobbyRepository,
          useValue: {
            getUserLobby: vi.fn(),
            getLobbyById: vi.fn(),
            updateLobby: vi.fn(),
          },
        },
        {
          provide: SeatManagerService,
          useValue: {
            take: vi.fn().mockResolvedValue("fake-lobby-id"),
          },
        },
      ],
    }).compile();

    useCase = module.get(JoinLobbyUseCase);
    seatManagerService = module.get(SeatManagerService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(seatManagerService).toBeDefined();
  });
});
