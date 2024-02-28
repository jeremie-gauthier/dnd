import type { LobbyEntity } from '@dnd/shared';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Hero } from 'src/database/entities/hero.entity';
import type { User } from 'src/database/entities/user.entity';
import { LobbyChangedPayload } from 'src/lobby/events/emitters/lobby-changed.payload';
import { LobbyEvent } from 'src/lobby/events/emitters/lobby-events.enum';
import type { MessageContext } from 'src/types/socket.type';
import { UseCase } from 'src/types/use-case.interface';
import { PickHeroInputDto } from './pick-hero.dto';
import { PickHeroRepository } from './pick-hero.repository';

@Injectable()
export class PickHeroUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: PickHeroRepository,
  ) {}

  public async execute({
    ctx,
    userId,
    lobbyId,
    heroId,
  }: PickHeroInputDto & {
    ctx: MessageContext;
    userId: User['id'];
  }): Promise<void> {
    // TODO: the lobby fetched might lack of a lock
    // TODO: peut-on pick un hero si on s'est declare "ready" ?
    const lobby = await this.repository.getLobbyById(lobbyId);
    if (!lobby) {
      throw new NotFoundException('Lobby not found');
    }

    this.pickHero({ lobby, userId, heroId });

    await this.repository.updateLobby(lobby);

    this.eventEmitter.emitAsync(LobbyEvent.LobbyChanged, new LobbyChangedPayload({ ctx, lobbyId }));
  }

  private pickHero({
    lobby,
    userId,
    heroId,
  }: {
    lobby: LobbyEntity;
    userId: User['id'];
    heroId: Hero['id'];
  }) {
    if (lobby.status !== 'OPENED') {
      throw new ForbiddenException('Lobby is not opened');
    }

    const heroIdx = lobby.heroesAvailable.findIndex(({ id }) => id === heroId);
    if (heroIdx < 0) {
      throw new NotFoundException('Hero not found');
    }

    const hero = lobby.heroesAvailable[heroIdx]!;

    const isFreeHero =
      hero.pickedBy === undefined &&
      lobby.players.every((player) =>
        player.heroesSelected.every((heroSelected) => heroSelected !== heroId),
      );
    if (!isFreeHero) {
      throw new ForbiddenException('Hero already picked');
    }

    const playerIdx = lobby.players.findIndex((player) => player.userId === userId);
    if (playerIdx < 0) {
      throw new ForbiddenException('You must be in the lobby to pick this hero');
    }

    const player = lobby.players[playerIdx]!;

    player.heroesSelected.push(heroId);
    hero.pickedBy = userId;
  }
}
