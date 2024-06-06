import { GetLobbyOutput } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import type { UseCase } from "src/types/use-case.interface";
import { BackupService } from "../services/backup/backup.service";
import { GetLobbyRepository } from "./get-lobby.repository";

@Injectable()
export class GetLobbyUseCase implements UseCase {
  constructor(
    private readonly repository: GetLobbyRepository,
    private readonly backupService: BackupService,
  ) {}

  public async execute({
    lobbyId,
  }: { lobbyId: string }): Promise<GetLobbyOutput> {
    const lobby = await this.backupService.getLobbyOrThrow({ lobbyId });
    const stage = await this.repository.getCampaignStageById(
      lobby.config.campaign.stage.id,
    );

    return {
      ...lobby,
      config: {
        ...lobby.config,
        campaign: {
          ...lobby.config.campaign,
          stage: {
            ...lobby.config.campaign.stage,
            intro: stage.intro,
            outro: stage.outro,
          },
        },
      },
    };
  }
}
