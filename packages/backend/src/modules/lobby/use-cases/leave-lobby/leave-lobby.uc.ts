import { Injectable } from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { SeatManagerService } from "src/modules/lobby/domain/seat-manager/seat-manager.service";

@Injectable()
export class LeaveLobbyUseCase implements UseCase {
  constructor(private readonly seatManagerService: SeatManagerService) {}

  public async execute({
    userId,
  }: { userId: User["id"] }): Promise<string | undefined> {
    const lobbyToLeave = await this.seatManagerService.getUserLobby({ userId });
    if (!lobbyToLeave) {
      return;
    }

    await this.seatManagerService.leave({ lobby: lobbyToLeave, userId });

    return lobbyToLeave.id;
  }
}
