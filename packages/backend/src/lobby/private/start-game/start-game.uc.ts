import { GameEntity, LobbyEntity, LobbyEntityStatus } from '@dnd/shared';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CampaignStage } from 'src/database/entities/campaign-stage.entity';
import type { User } from 'src/database/entities/user.entity';
import type { MessageContext } from 'src/types/socket.type';
import { UseCase } from 'src/types/use-case.interface';
import { StartGameInputDto } from './start-game.dto';
import { StartGameRepository } from './start-game.repository';

@Injectable()
export class StartGameUseCase implements UseCase {
  constructor(private readonly repository: StartGameRepository) {}

  public async execute({
    ctx,
    userId,
    lobbyId,
  }: StartGameInputDto & {
    ctx: MessageContext;
    userId: User['id'];
  }): Promise<void> {
    const lobby = await this.repository.getLobbyById(lobbyId);
    if (!lobby) {
      throw new NotFoundException('Lobby not found');
    }

    const stage = await this.repository.getStageAndProgression({
      stageId: lobby.config.campaign.stage.id,
      userId: lobby.host.userId,
    });

    this.setLobbyAsReadyForGame(lobby);
    await this.repository.updateLobby(lobby);
  }

  private setLobbyAsReadyForGame(lobby: LobbyEntity) {
    const { players, heroesAvailable } = lobby;
    if (players.some((player) => !player.isReady)) {
      throw new ForbiddenException('Some players are not ready');
    }

    if (heroesAvailable.some((heroAvailable) => !heroAvailable.pickedBy)) {
      throw new ForbiddenException('Some hero are not picked');
    }

    lobby.status = LobbyEntityStatus.GAME_STARTED;
  }

  private createGameFromLobby({
    lobby,
    stage,
  }: {
    lobby: LobbyEntity;
    stage: CampaignStage;
  }): GameEntity {
    return {
      id: lobby.id,
      // TODO: creer un module ou un service a part pour le parsing de map
      // => sera reutilise pour les sauvegarde de parties
      map: {},
    };
  }
}
