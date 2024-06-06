import { CreateLobbyInput, LobbyEntityStatus } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { CampaignStage } from "src/database/entities/campaign-stage.entity";
import type { User } from "src/database/entities/user.entity";
import type { UseCase } from "src/interfaces/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";
import type { CreateLobbyOutputDto } from "./create-lobby.dto";
import { CreateLobbyRepository } from "./create-lobby.repository";

@Injectable()
export class CreateLobbyUseCase implements UseCase {
  constructor(
    private readonly repository: CreateLobbyRepository,
    private readonly seatManagerService: SeatManagerService,
    private readonly backupService: BackupService,
  ) {}

  public async execute({
    userId,
    createLobbyInput: { nbPlayersMax, stageId },
  }: {
    userId: User["id"];
    createLobbyInput: CreateLobbyInput;
  }): Promise<CreateLobbyOutputDto> {
    await this.leavePreviousLobby({ userId });

    const [campaign, heroes] = await Promise.all([
      this.repository.getCampaignByStageId({ stageId }),
      this.repository.getHeroes({ stageId, userId }),
    ]);

    const selectedStage = this.getStageById(campaign.stages, stageId);

    const lobby = await this.repository.createLobby({
      status: LobbyEntityStatus.OPENED,
      host: {
        userId,
      },
      config: {
        nbPlayersMax,
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

  private getStageById(
    stages: CampaignStage[],
    stageId: CampaignStage["id"],
  ): CampaignStage {
    return stages.find(({ id }) => id === stageId)!;
  }

  private async leavePreviousLobby({ userId }: { userId: User["id"] }) {
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

    await this.seatManagerService.leave({ lobby: lobbyToLeave, userId });
  }
}
