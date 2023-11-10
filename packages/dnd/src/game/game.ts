/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  EntityEvent,
  EntityInputByEventName,
  entityEventEmitter,
} from '../entities/events/event-emitter.entity';
import {
  PlayableEntity,
  PlayableEntityType,
} from '../entities/playables/playable.abstract';
import { Map } from '../map/map';
import { lineOfSight } from '../map/pathfinder/ray-casting';
import { Objective } from './objectives/objective';
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
    public readonly objective: Objective,
  ) {
    this.gameMaster = this.players.find((player) =>
      player.isGameMaster(),
    )! as GameMaster;
    this.isRunning = true;
    this.rollInitiatives();

    console.log(
      this.getTimeline().map((c) => `${c.name} (${c.id.slice(0, 5)})`),
    );

    entityEventEmitter.addListener(
      EntityEvent.OnDoorOpening,
      this.onDoorOpening.bind(this),
    );
  }

  public start() {
    for (const entity of this.playingEntities()) {
      if (entity.isCharacter()) {
        this.currentEntityTurn = new CharacterTurn(entity);
        const characterTile = this.map.getTileAtCoord(entity.coord);
        if (!characterTile) {
          continue;
        }

        // This will be passed from the client in the future
        const enemy = this.getTimeline().find(
          (entity) =>
            entity.type === PlayableEntityType.Enemy && entity.isAlive,
        );
        if (!enemy) {
          continue;
        }

        const tilesInSight = lineOfSight(this.map, characterTile, entity.type);
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
  }

  private *playingEntities() {
    while (this.isRunning) {
      for (const entity of this.getTimeline()) {
        if (!entity.isAlive) {
          continue;
        }

        yield entity;

        this.checkGameConditions();
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!this.isRunning) {
          return;
        }
      }
    }
  }

  private checkGameConditions() {
    if (this.objective.testWinCondition()) {
      console.log('Characters won this game!');
      console.log(this.getTimeline().map((c) => c.name));
      this.isRunning = false;
    } else if (this.objective.testLooseCondition()) {
      console.log('Characters loose this game!');
      console.log(
        this.getTimeline().map((c) => `${c.name} (${c.id.slice(0, 5)})`),
      );

      this.isRunning = false;
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
