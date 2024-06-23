import { LobbyView } from "@dnd/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UseCase } from "src/interfaces/use-case.interface";
import { RequestCreateLobbyFulfilledPayload } from "src/modules/campaign/events/request-create-lobby-fulfilled.payload";
import {
  LOBBIES_REPOSITORY,
  LobbiesRepository,
} from "../../repositories/lobbies-repository.interface";
import {
  USERS_REPOSITORY,
  UsersRepository,
} from "../../repositories/users-repository.interface";
import { LeaveLobbyUseCase } from "../leave-lobby/leave-lobby.uc";

@Injectable()
export class CreateLobbyUseCase implements UseCase {
  constructor(
    @Inject(LOBBIES_REPOSITORY)
    protected readonly lobbiesRepository: LobbiesRepository,
    @Inject(USERS_REPOSITORY)
    protected readonly usersRepository: UsersRepository,
    protected readonly eventEmitter: EventEmitter2,
    private readonly leaveLobbyUseCase: LeaveLobbyUseCase,
  ) {}

  public async execute(
    payload: RequestCreateLobbyFulfilledPayload,
  ): Promise<LobbyView> {
    await this.leaveLobbyUseCase.execute({ userId: payload.userId });
    const lobby = await this.createLobby(payload);
    return lobby.toPlain();
  }

  private async createLobby({
    campaign,
    config,
    heroes,
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
          title: campaign.title,
        },
      },
      heroes,
      hostUserId: userId,
    });

    return lobby;
  }
}
