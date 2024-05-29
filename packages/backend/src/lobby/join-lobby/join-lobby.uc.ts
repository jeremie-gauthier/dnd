import type { LobbyEntity } from "@dnd/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/types/use-case.interface";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";
import type { JoinLobbyInputDto } from "./join-lobby.dto";
import { JoinLobbyRepository } from "./join-lobby.repository";

@Injectable()
export class JoinLobbyUseCase implements UseCase {
  constructor(
    private readonly repository: JoinLobbyRepository,
    private readonly seatManagerService: SeatManagerService,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: { userId: User["id"] } & JoinLobbyInputDto): Promise<LobbyEntity["id"]> {
    const lobbyToLeave = await this.getLobbyToLeave({ userId });
    if (lobbyToLeave) {
      this.seatManagerService.leave({ lobby: lobbyToLeave, userId });
      await this.repository.updateLobby({ lobby: lobbyToLeave });
    }

    const lobbyToJoin = await this.getLobbyToJoin({ lobbyId });
    await this.repository.updateLobby({ lobby: lobbyToJoin });

    return lobbyId;
  }

  private async getLobbyToLeave({
    userId,
  }: { userId: User["id"] }): Promise<LobbyEntity | undefined> {
    const lobbyIdToLeave = await this.repository.getUserLobby({ userId });
    if (!lobbyIdToLeave) {
      return;
    }

    const lobby = await this.repository.getLobbyById({
      lobbyId: lobbyIdToLeave,
    });
    if (!lobby) {
      return;
    }

    return lobby;
  }

  private async getLobbyToJoin({
    lobbyId,
  }: { lobbyId: LobbyEntity["id"] }): Promise<LobbyEntity> {
    const lobbyToJoin = await this.repository.getLobbyById({ lobbyId });
    if (!lobbyToJoin) {
      throw new NotFoundException("Lobby not found");
    }

    return lobbyToJoin;
  }
}
