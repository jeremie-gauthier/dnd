import type { LobbyEntity } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type { EventEmitter2 } from "@nestjs/event-emitter";
import type { User } from "src/database/entities/user.entity";
import { LobbyChangedPayload } from "src/lobby/events/emitters/lobby-changed.payload";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-events.enum";
import type { MessageContext } from "src/types/socket.type";
import type { UseCase } from "src/types/use-case.interface";
import type { TogglePlayerReadyStateInputDto } from "./toggle-player-ready-state.dto";
import type { TogglePlayerReadyStateRepository } from "./toggle-player-ready-state.repository";

@Injectable()
export class TogglePlayerReadyStateUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: TogglePlayerReadyStateRepository,
  ) {}

  public async execute({
    ctx,
    userId,
    lobbyId,
  }: TogglePlayerReadyStateInputDto & {
    ctx: MessageContext;
    userId: User["id"];
  }): Promise<void> {
    const lobby = await this.repository.getLobbyById(lobbyId);
    this.assertCanToggleReadyState(lobby);

    this.toggleUserReadyState({ lobby, userId });

    await this.repository.updateLobby(lobby);

    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyChanged,
      new LobbyChangedPayload({ ctx, lobbyId }),
    );
  }

  private assertCanToggleReadyState(
    lobby: LobbyEntity | null,
  ): asserts lobby is LobbyEntity {
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }

    if (lobby.status !== "OPENED") {
      throw new ForbiddenException("Lobby is not opened");
    }
  }

  private toggleUserReadyState({
    lobby,
    userId,
  }: { lobby: LobbyEntity; userId: User["id"] }) {
    const playerIdx = lobby.players.findIndex(
      (player) => player.userId === userId,
    );
    if (playerIdx < 0) {
      throw new ForbiddenException(
        "You must be in the lobby to set your ready state",
      );
    }

    const player = lobby.players[playerIdx]!;

    player.isReady = !player.isReady;
  }
}
