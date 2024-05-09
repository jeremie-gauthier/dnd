import { LobbyEntityStatus, type LobbyEntity } from "@dnd/shared";
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EnvSchema } from "src/config/env.config";
import type { User } from "src/database/entities/user.entity";
import { HostRequestedGameStartPayload } from "src/lobby/events/emitters/host-requested-game-start.payload";
import { LobbyChangedPayload } from "src/lobby/events/emitters/lobby-changed.payload";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-events.enum";
import type { UseCase } from "src/types/use-case.interface";
import type { StartGameInputDto } from "./start-game.dto";
import { StartGameRepository } from "./start-game.repository";

@Injectable()
export class StartGameUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: StartGameRepository,
    private readonly configService: ConfigService<EnvSchema>,
  ) {}

  public async execute({
    userId,
    lobbyId,
  }: StartGameInputDto & {
    userId: User["id"];
  }): Promise<void> {
    const lobby = await this.repository.getLobbyById(lobbyId);
    this.assertCanStartGame(userId, lobby);

    this.setLobbyAsReadyForGameInitializing(lobby);
    await this.repository.updateLobby(lobby);

    this.eventEmitter.emitAsync(
      LobbyEvent.LobbyChanged,
      new LobbyChangedPayload({ lobby }),
    );
    this.eventEmitter.emitAsync(
      LobbyEvent.HostRequestedGameStart,
      new HostRequestedGameStartPayload({ userId, lobby }),
    );
  }

  private assertCanStartGame(
    userId: User["id"],
    lobby: LobbyEntity | null,
  ): asserts lobby is LobbyEntity {
    if (!lobby) {
      throw new NotFoundException("Lobby not found");
    }

    if (lobby.status !== "OPENED") {
      throw new ForbiddenException("Lobby is not opened");
    }

    if (lobby.host.userId !== userId) {
      throw new ForbiddenException("You are not the host of this lobby");
    }
  }

  private setLobbyAsReadyForGameInitializing(lobby: LobbyEntity) {
    const { players, heroesAvailable } = lobby;
    if (players.some((player) => !player.isReady)) {
      throw new ForbiddenException("Some players are not ready");
    }

    if (heroesAvailable.some((heroAvailable) => !heroAvailable.pickedBy)) {
      throw new ForbiddenException("Some hero are not picked");
    }

    if (lobby.gameMaster.userId === undefined) {
      throw new ForbiddenException("No Game Master found for this lobby");
    }

    const gameMasterPlayer = lobby.players.find(
      ({ userId }) => userId === lobby.gameMaster.userId,
    )!;
    const isEnabled =
      this.configService.getOrThrow("NODE_ENV") !== "development";
    if (isEnabled && gameMasterPlayer.heroesSelected.length > 0) {
      throw new ForbiddenException("Game Master cannot control heroes");
    }

    lobby.status = LobbyEntityStatus.GAME_INITIALIZING;
  }
}
