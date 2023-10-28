/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PlayableEntity } from '../entities/playables/playable.abstract';
import { Map } from '../map/map';
import { lineOfSight } from '../map/pathfinder/ray-casting';
import { GameMaster } from './player/game-master.player';
import { Player } from './player/player.abstract';
import { CharacterTurn } from './turn/character.turn';
import { EnemyTurn } from './turn/enemy.turn';

export class Game {
  private isRunning = false;
  private gameMaster: GameMaster;

  constructor(
    private map: Map,
    private readonly players: Player[],
  ) {
    this.gameMaster = this.players.find((player) =>
      player.isGameMaster(),
    )! as GameMaster;
    this.isRunning = true;
    this.rollInitiatives();
  }

  public start() {
    while (this.isRunning) {
      for (const entity of this.getTimeline()) {
        if (!entity.isAlive) continue;

        if (entity.isCharacter()) {
          const characterTurn = new CharacterTurn(entity);
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
          characterTurn.start();
          characterTurn.attack(
            entity.inventory.equipped.weapon.items[0]!,
            enemy,
            tilesInSight,
          );

          characterTurn.end();
        } else if (entity.isEnemy()) {
          const enemyTurn = new EnemyTurn(entity);
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
          enemyTurn.start();
          enemyTurn.attack(
            entity.inventory.equipped.weapon.items[0]!,
            character,
            tilesInSight,
          );
          enemyTurn.end();
        }
      }
      if (!this.gameMaster.hasEnemyAlive()) {
        return;
      }
    }
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
