import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import type { MessageContext } from "src/types/socket.type";
import type { UseCase } from "src/types/use-case.interface";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";
import type { JoinLobbyInputDto } from "./join-lobby.dto";

@Injectable()
export class JoinLobbyUseCase implements UseCase {
  constructor(private readonly seatManagerService: SeatManagerService) {}

  public async execute({
    ctx,
    userId,
    lobbyId,
  }: { ctx: MessageContext; userId: User["id"] } & JoinLobbyInputDto): Promise<
    LobbyEntity["id"]
  > {
    await this.seatManagerService.take({ ctx, userId, lobbyId });
    return lobbyId;
  }
}
