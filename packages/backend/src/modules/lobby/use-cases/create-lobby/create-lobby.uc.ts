import { CreateLobbyOutput, LobbyEntityStatus } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { RequestCreateLobbyFulfilledPayload } from "src/modules/campaign/events/request-create-lobby-fulfilled.payload";
import { BackupService } from "src/modules/lobby/domain/backup/backup.service";
import { SeatManagerService } from "src/modules/lobby/domain/seat-manager/seat-manager.service";
import { CreateLobbyRepository } from "./create-lobby.repository";

@Injectable()
export class CreateLobbyUseCase implements UseCase {
  constructor(
    private readonly repository: CreateLobbyRepository,
    private readonly seatManagerService: SeatManagerService,
    private readonly backupService: BackupService,
  ) {}

  public async execute({
    campaign,
    config,
    heroes,
    selectedStage,
    userId,
  }: RequestCreateLobbyFulfilledPayload): Promise<CreateLobbyOutput> {
    await this.leavePreviousLobby({ userId });

    const lobby = await this.repository.createLobby({
      status: LobbyEntityStatus.OPENED,
      host: {
        userId,
      },
      config: {
        nbPlayersMax: config.nbPlayersMax,
        campaign: {
          id: campaign.id,
          title: campaign.title,
          nbStages: campaign.stages.length,
          stage: selectedStage,
        },
      },
      players: [],
      gameMaster: {
        userId: undefined,
      },
      heroesAvailable: heroes.map((hero) => ({
        ...hero,
        pickedBy: undefined,
      })),
    });

    this.seatManagerService.take({ lobby, userId });

    await this.backupService.updateLobby({ lobby });

    return lobby;
  }

  private async leavePreviousLobby({ userId }: { userId: User["id"] }) {
    const lobbyToLeave = await this.seatManagerService.getUserLobby({ userId });
    if (lobbyToLeave) {
      await this.seatManagerService.leave({ lobby: lobbyToLeave, userId });
    }
  }
}
