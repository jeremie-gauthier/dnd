import { LobbyEntity, LobbyEntityStatus } from '@dnd/shared';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import type { User } from 'src/database/entities/user.entity';
import { LobbyChangedPayload } from 'src/lobby/events/emitters/lobby-changed.payload';
import { LobbyEvent } from 'src/lobby/events/emitters/lobby-events.enum';
import { LobbyGameInitializingPayload } from 'src/lobby/events/emitters/lobby-game-started.payload';
import type { MessageContext } from 'src/types/socket.type';
import { UseCase } from 'src/types/use-case.interface';
import { StartGameInputDto } from './start-game.dto';
import { StartGameRepository } from './start-game.repository';

@Injectable()
export class StartGameUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: StartGameRepository,
  ) {}

  public async execute({
    ctx,
    userId,
    lobbyId,
  }: StartGameInputDto & {
    ctx: MessageContext;
    userId: User['id'];
  }): Promise<void> {
    // TODO: envoyer un msg vers le lobby pour notifier le chargement du jeu à tous les joueurs
    // TODO: un etat intermediaire representant le chargement du lobby ?
    //  ? Puis etat "game_started" déclaré au dernier moment, apres le module game

    const lobby = await this.repository.getLobbyById(lobbyId);
    this.assertCanStartGame(userId, lobby);

    this.setLobbyAsReadyForGameInitializing(lobby);
    await this.repository.updateLobby(lobby);

    this.eventEmitter.emitAsync(LobbyEvent.LobbyChanged, new LobbyChangedPayload({ ctx, lobbyId }));
    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyGameInitializing,
      new LobbyGameInitializingPayload({
        ctx,
        userId,
        lobbyId,
        campaignId: lobby.config.campaign.id,
        stageId: lobby.config.campaign.stage.id,
      }),
    );
  }

  private assertCanStartGame(
    userId: User['id'],
    lobby: LobbyEntity | null,
  ): asserts lobby is LobbyEntity {
    if (!lobby) {
      throw new NotFoundException('Lobby not found');
    }

    if (lobby.status !== 'OPENED') {
      throw new ForbiddenException('Lobby is not opened');
    }

    if (lobby.host.userId !== userId) {
      throw new ForbiddenException('You are not the host of this lobby');
    }
  }

  private setLobbyAsReadyForGameInitializing(lobby: LobbyEntity) {
    const { players, heroesAvailable } = lobby;
    if (players.some((player) => !player.isReady)) {
      throw new ForbiddenException('Some players are not ready');
    }

    if (heroesAvailable.some((heroAvailable) => !heroAvailable.pickedBy)) {
      throw new ForbiddenException('Some hero are not picked');
    }

    lobby.status = LobbyEntityStatus.GAME_INITIALIZING;
  }
}
