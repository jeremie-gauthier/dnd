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
import { MessageContext } from "src/types/socket.type";
import { UseCase } from "src/types/use-case.interface";
import { JoinLobbyInputDto } from "./join-lobby.dto";
import { JoinLobbyRepository } from "./join-lobby.repository";

@Injectable()
export class JoinLobbyUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: JoinLobbyRepository,
  ) {}

  public async execute({
    ctx,
    userId,
    lobbyId,
  }: { ctx: MessageContext; userId: User["id"] } & JoinLobbyInputDto): Promise<
    LobbyEntity["id"]
  > {
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

    return lobby.id;
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
}
