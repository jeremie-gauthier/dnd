import type { LobbyEntity } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { CampaignStage } from "src/database/entities/campaign-stage.entity";
import { Campaign } from "src/database/entities/campaign.entity";
import { User } from "src/database/entities/user.entity";
import { LobbiesRepository } from "src/redis/repositories/lobbies.repository";
import { UsersRepository } from "src/redis/repositories/users.repository";
import type { Repository } from "typeorm";

@Injectable()
export class CreateLobbyRepository {
  constructor(
    private readonly lobbiesRepository: LobbiesRepository,
    private readonly usersRepository: UsersRepository,
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  public async getUserLobby({ userId }: { userId: User["id"] }) {
    return await this.usersRepository.get(userId);
  }

  public async removePlayerFromLobby({
    userId,
    lobbyId,
  }: {
    userId: User["id"];
    lobbyId: LobbyEntity["id"];
  }): Promise<void> {
    const lobby = await this.lobbiesRepository.getOne(lobbyId);
    if (!lobby) {
      return;
    }

    await this.lobbiesRepository.update({
      ...lobby,
      players: lobby.players.filter((player) => player.userId !== userId),
    });
  }

  public async createLobby(
    lobby: Omit<LobbyEntity, "id">,
  ): Promise<LobbyEntity> {
    return await this.lobbiesRepository.set(lobby);
  }

  public async getCampaignByStageId(
    stageId: CampaignStage["id"],
  ): Promise<Campaign> {
    const campaigns = await this.campaignRepository.findOneOrFail({
      select: {
        id: true,
        title: true,
        stages: {
          id: true,
          order: true,
          title: true,
        },
      },
      where: {
        stages: {
          id: stageId,
        },
      },
      relations: {
        stages: true,
        playableHeroes: true,
      },
    });

    return campaigns;
  }
}
