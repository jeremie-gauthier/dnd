import type { LobbyEntity } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type { EventEmitter2 } from "@nestjs/event-emitter";
import type { Hero } from "src/database/entities/hero.entity";
import type { User } from "src/database/entities/user.entity";
import { LobbyChangedPayload } from "src/lobby/events/emitters/lobby-changed.payload";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-events.enum";
import type { MessageContext } from "src/types/socket.type";
import type { UseCase } from "src/types/use-case.interface";
import type { DiscardHeroInputDto } from "./discard-hero.dto";
import type { DiscardHeroRepository } from "./discard-hero.repository";

@Injectable()
export class DiscardHeroUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: DiscardHeroRepository,
  ) {}

  public async execute({
    ctx,
    userId,
    lobbyId,
    heroId,
  }: DiscardHeroInputDto & {
    ctx: MessageContext;
    userId: User["id"];
  }): Promise<void> {
    // TODO: the lobby fetched might lack of a lock
    // TODO: peut-on discard un hero si on s'est declare "ready" ?
    const lobby = await this.repository.getLobbyById(lobbyId);
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }

    this.discardHero({ lobby, userId, heroId });

    await this.repository.updateLobby(lobby);

    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyChanged,
      new LobbyChangedPayload({ ctx, lobbyId }),
    );
  }

  private discardHero({
    lobby,
    userId,
    heroId,
  }: {
    lobby: LobbyEntity;
    userId: User["id"];
    heroId: Hero["id"];
  }) {
    if (lobby.status !== "OPENED") {
      throw new ForbiddenException("Lobby is not opened");
    }

    const playerIdx = lobby.players.findIndex(
      (player) => player.userId === userId,
    );
    if (playerIdx < 0) {
      throw new ForbiddenException(
        "You must be in the lobby to discard this hero",
      );
    }

    const player = lobby.players[playerIdx]!;

    const heroIdx = lobby.heroesAvailable.findIndex(({ id }) => id === heroId);
    if (heroIdx < 0) {
      throw new NotFoundException("Hero not found");
    }

    const hero = lobby.heroesAvailable[heroIdx]!;

    const isHeroPickedByUser =
      hero.pickedBy === userId && player.heroesSelected.includes(heroId);
    if (!isHeroPickedByUser) {
      throw new ForbiddenException(
        "You can only discard heroes you have picked",
      );
    }

    player.heroesSelected = player.heroesSelected.filter((id) => id !== heroId);
    hero.pickedBy = undefined;
  }
}
