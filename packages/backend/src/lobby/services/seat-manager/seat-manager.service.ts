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
import { MessageContext } from "src/types/socket.type";
import { SeatManagerRepository } from "./seat-manager.repository";

@Injectable()
export class SeatManagerService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: SeatManagerRepository,
  ) {}

  public async take({
    ctx,
    userId,
    lobbyId,
  }: {
    ctx: MessageContext;
    userId: User["id"];
    lobbyId: LobbyEntity["id"];
  }): Promise<void> {
    // remove player from previous lobby (if any) before joining a new one
    await this.leave({ ctx, userId });

    const lobby = await this.repository.getLobbyById(lobbyId);
    this.assertsCanEnterLobby(userId, lobby);

    await this.repository.addPlayerToLobby({
      player: {
        userId,
        heroesSelected: [],
        isReady: false,
      },
      lobbyId,
    });

    this.eventEmitter.emitAsync(
      LobbyEvent.UserJoinedLobby,
      new UserJoinedLobbyPayload({
        ctx,
        userId,
        lobbyId,
      }),
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

  public async leave({
    ctx,
    userId,
  }: { ctx: MessageContext; userId: User["id"] }): Promise<void> {
    const lobbyId = await this.repository.getUserLobby(userId);
    if (!lobbyId) {
      return;
    }

    await this.repository.removePlayerFromLobby({ userId, lobbyId });

    await this.eventEmitter.emitAsync(
      LobbyEvent.UserLeftLobby,
      new UserLeftLobbyPayload({ ctx, userId, lobbyId }),
    );
  }
}
