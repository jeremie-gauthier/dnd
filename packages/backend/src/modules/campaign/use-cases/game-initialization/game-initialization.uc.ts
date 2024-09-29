import { PlayableEntityRaceType, unique } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MonsterTemplate } from "src/database/entities/enemy-template.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { HostRequestedGameStartPayload } from "src/modules/shared/events/lobby/host-requested-game-start.payload";
import { GameEventDeserialized } from "src/modules/shared/interfaces/game-events-deserialized.interface";
import { MapSerializerService } from "../../domain/map-serializer/map-serializer.service";
import { CampaignEvent } from "../../events/campaign-event.enum";
import { GameInitializationDonePayload } from "../../events/game-initialization-done.payload";
import { GameInitializationRepository } from "./game-initialization.repository";

@Injectable()
export class GameInitializationUseCase implements UseCase {
  constructor(
    private readonly repository: GameInitializationRepository,
    private readonly mapSerializerService: MapSerializerService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async execute({
    lobby,
  }: HostRequestedGameStartPayload): Promise<void> {
    const campaignStageProgression =
      await this.repository.getUserCampaignStageProgression({
        campaignStageId: lobby.config.campaign.stage.id,
        userId: lobby.host.userId,
      });

    const { map, events, winConditions, rooms } =
      this.mapSerializerService.deserialize(
        campaignStageProgression.stage.mapCompiled,
      );

    const enemyTemplates = await this.getEnemyTemplates({ events });

    this.eventEmitter.emitAsync(
      CampaignEvent.GameInitializationDone,
      new GameInitializationDonePayload({
        campaignStageProgression,
        enemyTemplates,
        events,
        lobby,
        map,
        winConditions,
        rooms,
      }),
    );
  }

  private async getEnemyTemplates({
    events,
  }: { events: GameEventDeserialized[] }): Promise<MonsterTemplate[]> {
    const enemiesName = this.getDistinctAvailableEnemies({ events });
    const enemyTemplates = await this.repository.getEnemiesByNames({
      enemiesName,
    });
    return enemyTemplates;
  }

  private getDistinctAvailableEnemies({
    events,
  }: { events: GameEventDeserialized[] }): PlayableEntityRaceType[] {
    return unique(events.flatMap((event) => event?.monsters ?? []));
  }
}
