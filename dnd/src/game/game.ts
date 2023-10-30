/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  EntityEvent,
  EntityInputByEventName,
  entityEventEmitter,
} from '../entities/events/event-emitter.entity';
import { PlayableEntity } from '../entities/playables/playable.abstract';
import { Map } from '../map/map';
import { lineOfSight } from '../map/pathfinder/ray-casting';
import { GameMaster } from './player/game-master.player';
import { Player } from './player/player.abstract';
import { CharacterTurn } from './turn/character.turn';
import { EnemyTurn } from './turn/enemy.turn';
import type { Turn } from './turn/turn.abstract';

export class Game {
  private isRunning = false;
  private gameMaster: GameMaster;
  private currentEntityTurn?: Turn;

  constructor(
    private map: Map,
    private readonly players: Player[],
  ) {
    this.gameMaster = this.players.find((player) =>
      player.isGameMaster(),
    )! as GameMaster;
    this.isRunning = true;
    this.rollInitiatives();

    entityEventEmitter.addListener(
      EntityEvent.OnDoorOpening,
      this.onDoorOpening.bind(this),
    );
  }

  public start() {
    while (this.isRunning) {
      for (const entity of this.getTimeline()) {
        if (!entity.isAlive) continue;

        if (entity.isCharacter()) {
          this.currentEntityTurn = new CharacterTurn(entity);
          const characterTile = this.map.getTileAtCoord(entity.coord);
          if (!characterTile) {
            continue;
          }

          // This will be passed from the client in the future
          const enemy = this.getTimeline().find(
            (entity) => entity.name === 'Goblin',
          );
          if (!enemy) {
            continue;
          }

          const tilesInSight = lineOfSight(
            this.map,
            characterTile,
            entity.type,
          );
          this.currentEntityTurn.start();
          this.currentEntityTurn.attack(
            entity.inventory.equipped.weapon.items[0]!,
            enemy,
            tilesInSight,
          );

          this.currentEntityTurn.end();
        } else if (entity.isEnemy()) {
          this.currentEntityTurn = new EnemyTurn(entity);
          const enemyTile = this.map.getTileAtCoord(entity.coord);
          if (!enemyTile) {
            continue;
          }

          // This will be passed from the client in the future
          const character = this.getTimeline().find(
            (entity) => entity.name === 'Regdar',
          );
          if (!character) {
            continue;
          }

          const tilesInSight = lineOfSight(this.map, enemyTile, entity.type);
          this.currentEntityTurn.start();
          this.currentEntityTurn.attack(
            entity.inventory.equipped.weapon.items[0]!,
            character,
            tilesInSight,
          );
          this.currentEntityTurn.end();
        }
      }
      if (!this.gameMaster.hasEnemyAlive()) {
        return;
      }
    }
  }

  private onDoorOpening({
    character,
  }: EntityInputByEventName[EntityEvent.OnDoorOpening]) {
    if (this.currentEntityTurn?.playableEntity === character) {
      this.currentEntityTurn.end();
    }

    this.rollInitiatives();
  }

  private rollInitiatives() {
    const entities = this.players.flatMap((player) => player.entities);
    for (const entity of entities) {
      entity.initiativeRoll();
    }
  }

  private getTimeline(): PlayableEntity[] {
    const entities = this.players.flatMap((player) => player.entities);
    entities.sort((a, b) => b.initiative - a.initiative);

    return entities;
  }
}
