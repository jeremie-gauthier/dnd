import { EnemyKind, GameEntity, unique } from "@dnd/shared";
import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EnemyTemplate } from "src/database/entities/enemy-template.entity";
import { UseCase } from "src/interfaces/use-case.interface";
import { HostRequestedGameStartPayload } from "src/modules/shared/events/lobby/host-requested-game-start.payload";
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
        userId: lobby.host.id.toString(),
      });

    const { map, events } = this.mapSerializerService.deserialize(
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
      }),
    );
  }

  private async getEnemyTemplates({
    events,
  }: { events: GameEntity["events"] }): Promise<EnemyTemplate[]> {
    const enemiesName = this.getDistinctAvailableEnemies({ events });
    const enemyTemplates = await this.repository.getEnemiesByNames({
      enemiesName,
    });
    return enemyTemplates;
  }

  private getDistinctAvailableEnemies({
    events,
  }: { events: GameEntity["events"] }): EnemyKind[] {
    return unique(events.flatMap((event) => event?.enemies ?? []));
  }
}
