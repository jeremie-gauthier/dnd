import { Test } from "@nestjs/testing";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";
import { JoinLobbyUseCase } from "./join-lobby.uc";

describe("StartGameUseCase", () => {
  let useCase: JoinLobbyUseCase;
  let seatManagerService: SeatManagerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JoinLobbyUseCase,
        {
          provide: SeatManagerService,
          useValue: {
            take: () => Promise.resolve("fake-lobby-id"),
          },
        },
      ],
    }).compile();

    useCase = module.get<JoinLobbyUseCase>(JoinLobbyUseCase);
    seatManagerService = module.get<SeatManagerService>(SeatManagerService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(useCase).toBeDefined();
    expect(seatManagerService).toBeDefined();
  });
});
