import { LobbyEntity } from "@dnd/shared";
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
    const lobbyToLeave = await this.getLobbyToLeave({ userId });
    if (!lobbyToLeave) {
      return;
    }

    await this.seatManagerService.leave({ lobby: lobbyToLeave, userId });

    return lobbyToLeave.id;
  }

  private async getLobbyToLeave({
    userId,
  }: { userId: User["id"] }): Promise<LobbyEntity | undefined> {
    const lobbyIdToLeave = await this.repository.getUserLobby({ userId });
    if (!lobbyIdToLeave) {
      return;
    }

    const lobbyToLeave = await this.repository.getLobbyById({
      lobbyId: lobbyIdToLeave,
    });
    if (!lobbyToLeave) {
      return;
    }

    return lobbyToLeave;
  }
}
