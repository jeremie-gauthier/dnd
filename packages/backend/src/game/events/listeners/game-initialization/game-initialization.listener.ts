import { GameEntity, LobbyEntity } from '@dnd/shared';
import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CampaignStageProgression } from 'src/database/entities/campaign-stage-progression.entity';
import { MapSerializerService } from 'src/game/map/map-serializer/map-serializer.service';
import { HostRequestedGameStartPayload } from 'src/lobby/events/emitters/host-requested-game-start.payload';
import { LobbyEvent } from 'src/lobby/events/emitters/lobby-events.enum';
import { GameEvent } from '../../emitters/game-events.enum';
import { GameInitializationDonePayload } from '../../emitters/game-initialization-done.payload';
import { GameInitializationStartedPayload } from '../../emitters/game-initialization-started.payload';
import { GameInitializationRepository } from './game-initialization.repository';

@Injectable()
export class GameInitializationListener {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: GameInitializationRepository,
    private readonly mapSerializer: MapSerializerService,
  ) {}

  @OnEvent(LobbyEvent.HostRequestedGameStart)
  public async handler(payload: HostRequestedGameStartPayload): Promise<void> {
    // 1. emit business evt "game_initialization"
    //    -> that will send ws evt "game initialization" under the hood
    this.eventEmitter.emitAsync(
      GameEvent.GameInitializationStarted,
      new GameInitializationStartedPayload({
        ctx: payload.ctx,
        lobbyId: payload.lobby.id,
      }),
    );

    const game = await this.createGame(payload.lobby);

    // 3. send business evt "game_initialized"
    //    -> that will send ws evt "game started" under the hood
    this.eventEmitter.emitAsync(
      GameEvent.GameInitializationDone,
      new GameInitializationDonePayload({
        ctx: payload.ctx,
        lobbyId: payload.lobby.id,
        game,
      }),
    );
  }

  private async createGame(lobby: LobbyEntity): Promise<GameEntity> {
    const campaignStageProgression = await this.repository.getUserCampaignStageProgression({
      campaignStageId: lobby.config.campaign.stage.id,
      userId: lobby.host.userId,
    });

    const map = this.mapSerializer.deserialize(campaignStageProgression.stage.mapCompiled);
    const playableEntities = this.getPlayableEntitiesMap({ lobby, campaignStageProgression });

    const game = await this.repository.saveGame({
      id: lobby.id,
      map,
      playableEntities,
      timeline: [],
    });

    return game;
  }

  private getPlayableEntitiesMap({
    lobby,
    campaignStageProgression,
  }: {
    lobby: LobbyEntity;
    campaignStageProgression: CampaignStageProgression;
  }): GameEntity['playableEntities'] {
    const heroPlayersMap = Object.fromEntries(
      lobby.heroesAvailable.map((hero) => [hero.id, hero.pickedBy!]),
    );

    const heroes = campaignStageProgression.campaignProgression.heroes;
    return Object.fromEntries(
      heroes.map((hero) => [
        hero.id,
        {
          id: hero.id,
          type: 'hero',
          playedByUserId: heroPlayersMap[hero.id]!,
          name: hero.name,
          class: hero.class,
          level: hero.level,
          initiative: NaN,
          coord: {
            row: NaN,
            column: NaN,
          },
          isBlocking: true,

          baseHealthPoints: hero.baseHealthPoints,
          healthPoints: hero.baseHealthPoints,

          baseManaPoints: hero.baseManaPoints,
          manaPoints: hero.baseManaPoints,

          baseArmorClass: hero.baseArmorClass,
          armorClass: hero.baseArmorClass,

          baseMovementPoints: hero.baseMovementPoints,
          movementPoints: hero.baseMovementPoints,

          baseActionPoints: hero.baseActionPoints,
          actionPoints: hero.baseActionPoints,
        },
      ]),
    );
  }
}
