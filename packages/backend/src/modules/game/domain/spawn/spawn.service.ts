import { Coord, GameView, PlayableEnemyEntity, Tile } from "@dnd/shared";
import { Injectable, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { DoorOpenedPayload } from "src/modules/shared/events/game/door-opened.payload";
import { OnDoorOpeningGameEvent } from "src/modules/shared/interfaces/game-events-deserialized.interface";
import { MapService } from "../map/map.service";
import { MoveService } from "../move/move.service";
import { PlayableEntityService } from "../playable-entities/playable-entity/playable-entity.service";

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
  }: { game: GameView; doorCoord: Coord }) {
    // const spawnEnemiesEvent = this.getBoundEvent({ game, doorCoord });
    // if (!spawnEnemiesEvent) {
    //   return;
    // }
    // const monsters = this.playableEntityService.createEnemies({
    //   game,
    //   enemiesName: spawnEnemiesEvent.monsters,
    // });
    // this.addEnemiesOnGame({ game, spawnEnemiesEvent, enemies: monsters });
    // this.eventEmitter.emitAsync(
    //   GameEvent.MonstersSpawned,
    //   new MonstersSpawnedPayload({ monsters, game }),
    // );
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
      // const tile = this.getFirstFreeStartingTileOrThrow({
      //   game,
      //   startingTiles: spawnEnemiesEvent.startingTiles,
      // });
      // game.playableEntities[enemy.id] = enemy;
      // enemy.coord = tile.coord;
      // tile.entities.push({ type: "playable-entity", id: enemy.id });
    }
  }

  private getFirstFreeStartingTileOrThrow({
    game,
    startingTiles,
  }: {
    game: GameView;
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
        event.action === "spawn_monsters" &&
        event.doorCoord.column === doorCoord.column &&
        event.doorCoord.row === doorCoord.row,
    );
    return;
    // return spawnEnemiesEvent;
  }
}
