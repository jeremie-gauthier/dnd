import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/types/use-case.interface";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";
import type { JoinLobbyInputDto } from "./join-lobby.dto";

@Injectable()
export class JoinLobbyUseCase implements UseCase {
  constructor(private readonly seatManagerService: SeatManagerService) {}

  public async execute({
    userId,
    lobbyId,
  }: { userId: User["id"] } & JoinLobbyInputDto): Promise<LobbyEntity["id"]> {
    await this.seatManagerService.take({ userId, lobbyId });
    return lobbyId;
  }
}
