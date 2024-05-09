import { LobbyEntityStatus } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import type { CampaignStage } from "src/database/entities/campaign-stage.entity";
import type { User } from "src/database/entities/user.entity";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-events.enum";
import { UserJoinedLobbyPayload } from "src/lobby/events/emitters/user-joined-lobby.payload";
import type { UseCase } from "src/types/use-case.interface";
import { SeatManagerService } from "../services/seat-manager/seat-manager.service";
import type {
  CreateLobbyInputDto,
  CreateLobbyOutputDto,
} from "./create-lobby.dto";
import { CreateLobbyRepository } from "./create-lobby.repository";

@Injectable()
export class CreateLobbyUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: CreateLobbyRepository,
    private readonly seatManagerService: SeatManagerService,
  ) {}

  public async execute({
    userId,
    createLobbyInputDto: { nbPlayersMax, stageId },
  }: {
    userId: User["id"];
    createLobbyInputDto: CreateLobbyInputDto;
  }): Promise<CreateLobbyOutputDto> {
    await this.seatManagerService.leave({ userId });

    const [campaign, heroes] = await Promise.all([
      this.repository.getCampaignByStageId({ stageId }),
      this.repository.getHeroes({ stageId, userId }),
    ]);

    const selectedStage = this.getStageById(campaign.stages, stageId);

    const lobby = await this.repository.createLobby({
      status: LobbyEntityStatus.OPENED,
      host: {
        userId,
      },
      config: {
        nbPlayersMax,
        campaign: {
          id: campaign.id,
          title: campaign.title,
          nbStages: campaign.stages.length,
          stage: selectedStage,
        },
      },
      players: [
        {
          userId,
          heroesSelected: [],
          isReady: false,
        },
      ],
      gameMaster: {
        userId: undefined,
      },
      heroesAvailable: heroes.map((hero) => ({
        ...hero,
        pickedBy: undefined,
      })),
    });

    this.eventEmitter.emitAsync(
      LobbyEvent.UserJoinedLobby,
      new UserJoinedLobbyPayload({ userId, lobby }),
    );

    return lobby;
  }

  private getStageById(
    stages: CampaignStage[],
    stageId: CampaignStage["id"],
  ): CampaignStage {
    return stages.find(({ id }) => id === stageId)!;
  }
}
