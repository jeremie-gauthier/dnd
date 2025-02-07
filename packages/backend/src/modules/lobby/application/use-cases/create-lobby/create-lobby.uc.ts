import { LobbyView } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UseCase } from "src/interfaces/use-case.interface";
import { RequestCreateLobbyFulfilledPayload } from "src/modules/campaign/events/request-create-lobby-fulfilled.payload";
import {
  LOBBY_REPOSITORY,
  LobbyRepository,
} from "../../repositories/lobbies-repository.interface";
import { LeaveLobbyUseCase } from "../leave-lobby/leave-lobby.uc";

@Injectable()
export class CreateLobbyUseCase implements UseCase {
  constructor(
    @Inject(LOBBY_REPOSITORY)
    protected readonly lobbiesRepository: LobbyRepository,
    protected readonly eventEmitter: EventEmitter2,
    private readonly leaveLobbyUseCase: LeaveLobbyUseCase,
  ) {}

  public async execute(
    payload: RequestCreateLobbyFulfilledPayload,
  ): Promise<LobbyView> {
    await this.leaveLobbyUseCase.execute({ userId: payload.userId });
    const lobby = await this.createLobby(payload);

    const plainLobby = lobby.toPlain();
    return {
      ...plainLobby,
      players: plainLobby.players.map(({ status, ...player }) => ({
        ...player,
        isReady: status,
        heroesSelected: plainLobby.playableCharacters
          .filter((pc) => pc.pickedBy === player.userId)
          .map((pc) => pc.id),
      })),
      status: plainLobby.status,
    };
  }

  private async createLobby({
    campaign,
    config,
    selectedStage,
    userId,
  }: RequestCreateLobbyFulfilledPayload) {
    const lobby = await this.lobbiesRepository.create({
      config: {
        nbPlayersMax: config.nbPlayersMax,
        campaign: {
          id: campaign.id,
          nbStages: campaign.stages.length,
          stage: selectedStage,
        },
      },
      hostUserId: userId,
    });

    return lobby;
  }
}
