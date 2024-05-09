import { Injectable } from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/types/use-case.interface";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";
import { LeaveLobbyRepository } from "./leave-lobby.repository";

@Injectable()
export class LeaveLobbyUseCase implements UseCase {
  constructor(
    private readonly repository: LeaveLobbyRepository,
    private readonly seatManagerService: SeatManagerService,
  ) {}

  public async execute({
    userId,
  }: { userId: User["id"] }): Promise<string | undefined> {
    const lobbyId = await this.repository.getUserLobby({ userId });
    if (!lobbyId) return;

    await this.seatManagerService.leave({ userId });

    return lobbyId;
  }
}
