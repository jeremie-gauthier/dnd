import { LobbyEntity } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/database/entities/user.entity";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-events.enum";
import { UserJoinedLobbyPayload } from "src/lobby/events/emitters/user-joined-lobby.payload";
import { UserLeftLobbyPayload } from "src/lobby/events/emitters/user-left-lobby.payload";

@Injectable()
export class SeatManagerService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  public take({
    lobby,
    userId,
  }: {
    lobby: LobbyEntity;
    userId: User["id"];
  }): void {
    this.assertsCanEnterLobby(userId, lobby);

    lobby.players.push({
      userId,
      heroesSelected: [],
      isReady: false,
    });

    this.eventEmitter.emitAsync(
      LobbyEvent.UserJoinedLobby,
      new UserJoinedLobbyPayload({ userId, lobby }),
    );
  }

  private assertsCanEnterLobby(
    userId: User["id"],
    lobby: LobbyEntity | null,
  ): asserts lobby is LobbyEntity {
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }

    if (lobby.status !== "OPENED") {
      throw new ForbiddenException("Lobby is not opened");
    }

    if (lobby.players.length >= lobby.config.nbPlayersMax) {
      throw new ForbiddenException("No space left in this lobby");
    }

    if (lobby.players.some((player) => player.userId === userId)) {
      throw new ForbiddenException("You are already in this lobby");
    }
  }

  public leave({
    lobby,
    userId,
  }: {
    lobby: LobbyEntity;
    userId: User["id"];
  }): void {
    lobby.players = lobby.players.filter((player) => player.userId !== userId);
    for (const heroAvailable of lobby.heroesAvailable) {
      if (heroAvailable.pickedBy === userId) {
        heroAvailable.pickedBy = undefined;
      }
    }

    // TODO: handle ownership change

    this.eventEmitter.emitAsync(
      LobbyEvent.UserLeftLobby,
      new UserLeftLobbyPayload({ userId, lobby }),
    );
  }
}
