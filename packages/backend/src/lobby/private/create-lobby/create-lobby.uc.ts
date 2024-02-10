import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CampaignStage } from 'src/database/entities/campaign-stage.entity';
import { User } from 'src/database/entities/user.entity';
import { LobbyEvent } from 'src/lobby/events/emitters/lobby-events.enum';
import { UserJoinedLobbyPayload } from 'src/lobby/events/emitters/user-joined-lobby.payload';
import { MessageContext } from 'src/types/socket.type';
import { UseCase } from 'src/types/use-case.interface';
import { CreateLobbyInputDto, CreateLobbyOutputDto } from './create-lobby.dto';
import { CreateLobbyRepository } from './create-lobby.repository';

@Injectable()
export class CreateLobbyUseCase implements UseCase {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: CreateLobbyRepository,
  ) {}

  public async execute({
    ctx,
    userId,
    createLobbyInputDto: { nbPlayersMax, stageId },
  }: {
    ctx: MessageContext;
    userId: User['id'];
    createLobbyInputDto: CreateLobbyInputDto;
  }): Promise<CreateLobbyOutputDto> {
    const campaign = await this.repository.getCampaignByStageId(stageId);

    const selectedStage = this.getStageById(campaign.stages, stageId);

    const lobby = await this.repository.createLobby({
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
      heroesAvailable: campaign.playableHeroes.map(({ id }) => ({ id, pickedBy: undefined })),
    });

    this.eventEmitter.emitAsync(
      LobbyEvent.UserJoinedLobby,
      new UserJoinedLobbyPayload({
        ctx,
        userId,
        lobbyId: lobby.id,
      }),
    );

    return {
      ...lobby,
      heroesAvailable: campaign.playableHeroes,
    };
  }

  private getStageById(stages: CampaignStage[], stageId: CampaignStage['id']): CampaignStage {
    return stages.find(({ id }) => id === stageId)!;
  }
}
