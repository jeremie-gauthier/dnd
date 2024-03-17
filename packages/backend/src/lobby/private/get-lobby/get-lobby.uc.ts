import type { LobbyEntity } from "@dnd/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import type { HeroTemplate } from "src/database/entities/hero-template.entity";
import type { UseCase } from "src/types/use-case.interface";
import type { GetLobbyOutputDto } from "./get-lobby.dto";
import type { GetLobbyRepository } from "./get-lobby.repository";

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

    const heroesAvailable = this.getHeroesAvailableDetails(
      lobby.heroesAvailable,
      stage.campaign.playableHeroes,
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
      heroesAvailable,
    };
  }

  private getHeroesAvailableDetails(
    heroesLobby: LobbyEntity["heroesAvailable"],
    heroesTemplates: HeroTemplate[],
  ): GetLobbyOutputDto["heroesAvailable"] {
    const heroTemplateByIdMap = new Map(
      heroesTemplates.map((heroTemplate) => [heroTemplate.id, heroTemplate]),
    );
    const heroesAvailable = heroesLobby.map((heroLobby) => {
      const heroTemplate = heroTemplateByIdMap.get(heroLobby.id);
      if (!heroTemplate) {
        throw new NotFoundException("Hero not found");
      }

      return {
        ...heroLobby,
        ...heroTemplate,
      };
    });

    return heroesAvailable;
  }
}
