/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Regdar } from './entities/playables/characters/regdar.hero';
import { Goblin } from './entities/playables/enemies/goblin.enemy';
import { Game } from './game/game';
import { Objective } from './game/objectives/objective';
import {
  AllCharactersAreDead,
  KillAllEnemies,
} from './game/objectives/objectives.type';
import { GameMaster } from './game/player/game-master.player';
import { Hero } from './game/player/hero.player';
import { BroadSword } from './items/weapons/broad-sword.weapon';
import { Map } from './map/map';
import { MapParser } from './map/parser/map-parser';
import { MapReader } from './map/parser/map-reader';

const mapReader = new MapReader(__dirname + '/../resources/maps/chunk1_v2.txt');
const mapParser = new MapParser(mapReader);
mapParser
  .run()
  .then(([width, height, tiles]) => {
    const map = new Map(width, height, tiles);

    const heroTile = map.tiles[8]![5]!;
    const regdar = new Regdar(heroTile.coord);
    regdar.equip(new BroadSword());
    heroTile.entities.push(regdar);

    const gmEntities = [];
    {
      const goblinTile = map.tiles[8]![4]!;
      const goblin = new Goblin(goblinTile.coord);
      goblinTile.entities.push(goblin);
      gmEntities.push(goblin);
    }
    {
      const goblinTile = map.tiles[7]![5]!;
      const goblin = new Goblin(goblinTile.coord);
      goblinTile.entities.push(goblin);
      gmEntities.push(goblin);
    }
    {
      const goblinTile = map.tiles[8]![6]!;
      const goblin = new Goblin(goblinTile.coord);
      goblinTile.entities.push(goblin);
      gmEntities.push(goblin);
    }

    console.log(map.toString());

    const players = [new Hero([regdar]), new GameMaster(gmEntities)];
    const winCondition: KillAllEnemies = {
      name: 'killAllEnemies',
      data: { enemies: gmEntities },
    };
    const looseCondition: AllCharactersAreDead = {
      name: 'allCharactersAreDead',
      data: {
        characters: [regdar],
      },
    };
    const objective = new Objective(winCondition, looseCondition);
    const game = new Game(map, players, objective);

    game.start();
  })
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch((error) => {
    console.error('ERROR', error);
  });
