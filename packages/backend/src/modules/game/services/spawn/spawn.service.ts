import {
  Coord,
  GameEntity,
  OnDoorOpeningGameEvent,
  PlayableEnemyEntity,
  Tile,
} from "@dnd/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { DoorOpenedPayload } from "src/modules/game/events/emitters/door-opened.payload";
import { EnemiesSpawnedPayload } from "src/modules/game/events/emitters/enemies-spawned.payload";
import { GameEvent } from "src/modules/game/events/emitters/game-event.enum";
import { MapService } from "../map/map.service";
import { MoveService } from "../move/move.service";
import { PlayableEntityService } from "../playable-entity/playable-entity.service";

@Injectable()
export class SpawnService {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly playableEntityService: PlayableEntityService,
    private readonly moveService: MoveService,
    private readonly mapService: MapService,
  ) {}

  public spawnEnemies({
    game,
    doorCoord,
  }: { game: GameEntity; doorCoord: Coord }) {
    const spawnEnemiesEvent = this.getBoundEvent({ game, doorCoord });
    if (!spawnEnemiesEvent) {
      return;
    }

    const enemies = this.playableEntityService.createEnemies({
      game,
      enemiesName: spawnEnemiesEvent.enemies,
    });
    this.addEnemiesOnGame({ game, spawnEnemiesEvent, enemies });

    this.eventEmitter.emitAsync(
      GameEvent.EnemiesSpawned,
      new EnemiesSpawnedPayload({ enemies, game }),
    );
  }

  private addEnemiesOnGame({
    game,
    spawnEnemiesEvent,
    enemies,
  }: Pick<DoorOpenedPayload, "game"> & {
    spawnEnemiesEvent: OnDoorOpeningGameEvent;
    enemies: PlayableEnemyEntity[];
  }): void {
    for (const enemy of enemies) {
      const tile = this.getFirstFreeStartingTileOrThrow({
        game,
        startingTiles: spawnEnemiesEvent.startingTiles,
      });

      game.playableEntities[enemy.id] = enemy;
      enemy.coord = tile.coord;
      tile.entities.push({ type: "playable-entity", id: enemy.id });
    }
  }

  private getFirstFreeStartingTileOrThrow({
    game,
    startingTiles,
  }: {
    game: GameEntity;
    startingTiles: OnDoorOpeningGameEvent["startingTiles"];
  }): Tile {
    const firstFreeStartingCoord = startingTiles.find((tileCoord) =>
      this.moveService.canMoveToRequestedPosition({
        game,
        requestedPosition: tileCoord,
      }),
    );
    if (!firstFreeStartingCoord) {
      throw new NotFoundException("No free starting coord found");
    }

    const firstFreeStartingTile = this.mapService.getTileOrThrow({
      coord: firstFreeStartingCoord,
      game,
    });
    return firstFreeStartingTile;
  }

  private getBoundEvent({
    game,
    doorCoord,
  }: Pick<DoorOpenedPayload, "game" | "doorCoord">):
    | OnDoorOpeningGameEvent
    | undefined {
    const spawnEnemiesEvent = game.events.find(
      (event) =>
        event.name === "on_door_opening" &&
        event.action === "spawn_enemies" &&
        event.doorCoord.column === doorCoord.column &&
        event.doorCoord.row === doorCoord.row,
    );
    return spawnEnemiesEvent;
  }
}
