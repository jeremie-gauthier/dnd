import { Character } from '../entities/playables/characters/character.abstract';
import { PlayableEntityType } from '../entities/playables/playable.abstract';
import { Map } from '../map/map';
import { lineOfSight } from '../map/pathfinder/ray-casting';
import { randArray } from '../utils/rand-array';
import { GameMaster } from './player/game-master.player';
import { Player } from './player/player.abstract';
import { HeroTurn } from './turn/hero.turn';

export class Game {
  public timeline: (Character | GameMaster)[] = [];
  private isRunning = false;

  constructor(
    private map: Map,
    private readonly players: Player[],
  ) {
    this.timeline = this.getNewTimeline();
    this.isRunning = true;
  }

  public start() {
    while (this.isRunning) {
      for (const player of this.timeline) {
        if (player.type === PlayableEntityType.Character) {
          const heroTurn = new HeroTurn(player);
          const heroTile = this.map.getTileAtCoord(player.coord);
          if (!heroTile) {
            continue;
          }

          const enemy = this.players
            .find((player) => player.isGameMaster())
            ?.entities.find((entity) => entity.name === 'Goblin');
          if (!enemy) {
            continue;
          }

          const tilesInSight = lineOfSight(this.map, heroTile, player.type);
          heroTurn.start();
          heroTurn.attack(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            player.inventory.equipped.weapon.items[0]!,
            enemy,
            tilesInSight,
          );
          heroTurn.end();
        } else {
          continue;
          // throw new Error('Not implemented (GM Turn)');
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const gm = this.players.find((player) => player.isGameMaster())!;
      if (gm.entities.every((entity) => !entity.isAlive)) {
        return;
      }
    }
  }

  private getNewTimeline(): (Character | GameMaster)[] {
    const timeline: (Character | GameMaster | undefined)[] = Array.from({
      length: 5,
    });
    const initiativeScores = randArray([1, 2, 3, 4, 5]);

    let initiativeScoresIndex = 0;
    for (const player of this.iteratePlayers()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const initiativeScore = initiativeScores[initiativeScoresIndex]!;
      timeline[initiativeScore] = player;
      initiativeScoresIndex += 1;
    }

    return timeline.filter(
      (player): player is Character | GameMaster => player !== undefined,
    );
  }

  private *iteratePlayers() {
    for (const player of this.players) {
      if (player.isGameMaster()) {
        yield player;
      } else if (player.isHero()) {
        for (const character of player.entities) {
          yield character;
        }
      }
    }
  }
}
