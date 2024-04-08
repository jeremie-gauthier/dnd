import { Injectable, NotFoundException } from "@nestjs/common";
import type { UseCase } from "src/types/use-case.interface";
import type { GetLobbyOutputDto } from "./get-lobby.dto";
import { GetLobbyRepository } from "./get-lobby.repository";

@Injectable()
export class GetLobbyUseCase implements UseCase {
  constructor(private readonly repository: GetLobbyRepository) {}

  public async execute({
    lobbyId,
  }: { lobbyId: string }): Promise<GetLobbyOutputDto> {
    const lobby = await this.repository.getLobbyById(lobbyId);
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }

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
