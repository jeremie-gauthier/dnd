import {
  EnemyKind,
  unique,
  type GameEntity,
  type LobbyEntity,
  type Tile,
} from "@dnd/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import type { CampaignStageProgression } from "src/database/entities/campaign-stage-progression.entity";
import { MapSerializerService } from "src/game/map/services/map-serializer/map-serializer.service";
import { MovesService } from "src/game/moves/services/moves.service";
import { PlayableEntityService } from "src/game/playable-entity/services/playable-entity/playable-entity.service";
import { InitiativeService } from "src/game/timeline/services/initiative/initiative.service";
import type { HostRequestedGameStartPayload } from "src/lobby/events/emitters/host-requested-game-start.payload";
import { LobbyEvent } from "src/lobby/events/emitters/lobby-events.enum";
import { GameEvent } from "../../emitters/game-events.enum";
import { GameInitializationDonePayload } from "../../emitters/game-initialization-done.payload";
import { GameInitializationStartedPayload } from "../../emitters/game-initialization-started.payload";
import { GameInitializationRepository } from "./game-initialization.repository";

@Injectable()
export class GameInitializationListener {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly repository: GameInitializationRepository,
    private readonly mapSerializer: MapSerializerService,
    private readonly movesService: MovesService,
    private readonly initiativeService: InitiativeService,
    private readonly playableEntityService: PlayableEntityService,
  ) {}

  @OnEvent(LobbyEvent.HostRequestedGameStart)
  public async handler({
    lobby,
  }: HostRequestedGameStartPayload): Promise<void> {
    this.eventEmitter.emitAsync(
      GameEvent.GameInitializationStarted,
      new GameInitializationStartedPayload({ lobby }),
    );

    const game = await this.createGame(lobby);

    this.eventEmitter.emitAsync(
      GameEvent.GameInitializationDone,
      new GameInitializationDonePayload({ lobby, game }),
    );
  }

  private async createGame(lobby: LobbyEntity): Promise<GameEntity> {
    const campaignStageProgression =
      await this.repository.getUserCampaignStageProgression({
        campaignStageId: lobby.config.campaign.stage.id,
        userId: lobby.host.userId,
      });

    const { map, events } = this.mapSerializer.deserialize(
      campaignStageProgression.stage.mapCompiled,
    );
    const playableEntities = this.getPlayableEntitiesMap({
      lobby,
      campaignStageProgression,
    });
    const enemyTemplates = await this.getEnemyTemplates({ events });

    const game: GameEntity = {
      id: lobby.id,
      status: "battle_ongoing",
      gameMaster: {
        userId: lobby.gameMaster.userId!,
      },
      map,
      playableEntities,
      timeline: [],
      events,
      enemyTemplates,
    };

    this.randomlyPlaceHeroesOnStartingTiles({ game });
    this.initiativeService.rollPlayableEntitiesInitiative({ game });
    this.setPlayerGamePhase({ game });

    const savedGame = await this.repository.saveGame(game);

    return savedGame;
  }

  private getPlayableEntitiesMap({
    lobby,
    campaignStageProgression,
  }: {
    lobby: LobbyEntity;
    campaignStageProgression: CampaignStageProgression;
  }): GameEntity["playableEntities"] {
    const heroPlayersMap = Object.fromEntries(
      lobby.heroesAvailable.map((hero) => [hero.id, hero.pickedBy!]),
    );

    const heroes = campaignStageProgression.campaignProgression.heroes;
    return Object.fromEntries(
      heroes.map((hero) => [
        hero.id,
        {
          id: hero.id,
          type: "hero",
          currentPhase: "preparation",
          playedByUserId: heroPlayersMap[hero.id]!,
          name: hero.name,
          class: hero.class,
          level: hero.level,
          initiative: Number.NaN,
          coord: {
            row: Number.NaN,
            column: Number.NaN,
          },
          isBlocking: true,

          characteristic: {
            ...hero.characteristic,
            healthPoints: hero.characteristic.baseHealthPoints,
            manaPoints: hero.characteristic.baseManaPoints,
            armorClass: hero.characteristic.baseArmorClass,
            movementPoints: hero.characteristic.baseMovementPoints,
            actionPoints: hero.characteristic.baseActionPoints,
          },
        },
      ]),
    );
  }

  private randomlyPlaceHeroesOnStartingTiles({
    game,
  }: { game: GameEntity }): void {
    const playableEntities = Object.values(game.playableEntities);
    for (const playableEntity of playableEntities) {
      if (playableEntity.type !== "hero") continue;

      const firstFreeStartingTile = this.getFirstFreeStartingTileOrThrow(game);
      this.movesService.moveHeroToRequestedPosition({
        game,
        heroId: playableEntity.id,
        requestedPosition: firstFreeStartingTile.coord,
      });
    }
  }

  private getFirstFreeStartingTileOrThrow(game: GameEntity): Tile {
    const firstFreeStartingTile = game.map.tiles.find(
      (tile) =>
        tile.isStartingTile &&
        this.movesService.canMoveToRequestedPosition({
          game,
          requestedPosition: tile.coord,
        }),
    );
    if (!firstFreeStartingTile) {
      throw new NotFoundException("No free starting tile found");
    }

    return firstFreeStartingTile;
  }

  private setPlayerGamePhase({ game }: { game: GameEntity }): void {
    const playableEntities = Object.values(game.playableEntities);
    for (const playableEntity of playableEntities) {
      playableEntity.currentPhase = "idle";
    }

    const firstPlayableEntityIdToPlay = game.timeline[0];
    if (!firstPlayableEntityIdToPlay) return;

    const firstPlayableEntityToPlay =
      game.playableEntities[firstPlayableEntityIdToPlay];
    if (!firstPlayableEntityToPlay) return;

    firstPlayableEntityToPlay.currentPhase = "action";
  }

  private async getEnemyTemplates({
    events,
  }: { events: GameEntity["events"] }): Promise<GameEntity["enemyTemplates"]> {
    const enemiesName = this.getDistinctAvailableEnemies({ events });
    const enemyTemplates = await this.playableEntityService.getEnemiesTemplates(
      { enemiesName },
    );

    return Object.fromEntries(
      enemyTemplates.map((enemyTemplate) => [
        enemyTemplate.name,
        enemyTemplate,
      ]),
    );
  }

  private getDistinctAvailableEnemies({
    events,
  }: { events: GameEntity["events"] }): EnemyKind[] {
    return unique(events.flatMap((event) => event?.enemies ?? []));
  }
}
