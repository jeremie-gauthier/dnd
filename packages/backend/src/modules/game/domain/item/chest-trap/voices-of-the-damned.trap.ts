import { Board } from "../../board/board.entity";
import { Coord } from "../../coord/coord.vo";
import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Tile } from "../../tile/tile.entity";
import { ChestTrap } from "./chest-trap.abstract";

export class VoicesOfTheDamned extends ChestTrap {
  constructor() {
    super({ level: 1, name: "voices_of_the_damned_1" });
  }

  public override use({
    entityThatOpenedTheChest,
    game,
  }: {
    entityThatOpenedTheChest: Hero;
    game: Game;
  }): void {
    const otherHeroes = game.playableEntities.getOtherAlivedHeroes({
      hero: entityThatOpenedTheChest,
    });
    const otherHeroesAccessible = this.getOtherHeroesSortedByClosestDistance({
      startCoord: entityThatOpenedTheChest.coord,
      otherHeroes,
      board: game.board,
    });
    const firstFreeTile = this.getFirstFreeTileAroundOtherHeroes({
      otherHeroes: otherHeroesAccessible,
      game,
    });

    if (firstFreeTile) {
      const { otherHero, freeCoord } = firstFreeTile;
      game.movePlayableEntity({
        playableEntityId: entityThatOpenedTheChest.id,
        destinationCoord: freeCoord,
      });
      this.inflictDamageToOtherHero({
        entityThatOpenedTheChest,
        otherHero,
        game,
      });
    } else {
      this.selfInflictDamage({ entityThatOpenedTheChest });
    }
  }

  private getOtherHeroesSortedByClosestDistance({
    startCoord,
    otherHeroes,
    board,
  }: { startCoord: Coord; otherHeroes: Hero[]; board: Board }) {
    const metadata = { width: board.width, height: board.height };
    const queue = [{ coord: startCoord, range: 0 }];

    const explored = new Set([startCoord.toIndex(metadata)]);

    const endCoordsStatuses = otherHeroes.map((otherHero) => ({
      otherHero,
      isVisited: false,
      range: Number.NaN,
    }));

    while (queue.length > 0) {
      const currentCoordPath = queue.shift()!;

      console.log(currentCoordPath, queue.length);
      let currentTile: Tile;
      try {
        currentTile = board.getTileOrThrow({
          coord: currentCoordPath.coord,
        });
      } catch {
        continue;
      }

      if (currentTile.isBlockedByNonInteractiveEntity()) {
        continue;
      }

      const neighbourCoords = currentCoordPath.coord.getNeighbours();
      for (const neighbourCoord of neighbourCoords) {
        let neighbourCoordIdx: number;

        try {
          neighbourCoordIdx = neighbourCoord.toIndex(metadata);
        } catch (error) {
          continue;
        }

        if (explored.has(neighbourCoordIdx)) {
          continue;
        }

        const endCoordFound = endCoordsStatuses.find((endCoordStatus) =>
          endCoordStatus.otherHero.coord.equals(neighbourCoord),
        );
        if (endCoordFound) {
          endCoordFound.range = currentCoordPath.range + 1;
          endCoordFound.isVisited = true;

          if (endCoordsStatuses.every(({ isVisited }) => isVisited)) {
            endCoordsStatuses.sort((a, b) => a.range - b.range);
            return endCoordsStatuses.map(({ otherHero }) => otherHero);
          }
        }

        queue.push({
          coord: neighbourCoord,
          range: currentCoordPath.range + 1,
        });
        explored.add(neighbourCoordIdx);
      }
    }

    const filteredEndCoordsStatuses = endCoordsStatuses.filter(
      ({ isVisited }) => isVisited,
    );
    filteredEndCoordsStatuses.sort((a, b) => a.range - b.range);
    return filteredEndCoordsStatuses.map(({ otherHero }) => otherHero);
  }

  private getFirstFreeTileAroundOtherHeroes({
    otherHeroes,
    game,
  }: { otherHeroes: Hero[]; game: Game }) {
    for (const otherHero of otherHeroes) {
      const neighbourCoords = otherHero.coord.getNeighbours();
      const freeCoord = neighbourCoords.find((coord) => {
        try {
          game.board.mustBeAnAccessibleTile({ coord });
          return true;
        } catch (error) {
          return false;
        }
      });

      if (freeCoord) {
        return { otherHero, freeCoord };
      }
    }
  }

  private inflictDamageToOtherHero({
    entityThatOpenedTheChest,
    otherHero,
    game,
  }: { entityThatOpenedTheChest: Hero; otherHero: Hero; game: Game }) {
    const weapon = entityThatOpenedTheChest.inventory.getFirstWeaponInGear();

    if (weapon) {
      const regularAttack = weapon.getRegularAttackOrThrow();

      game.playableEntityAttack({
        attacker: entityThatOpenedTheChest,
        defender: otherHero,
        attackId: regularAttack.id,
        attackItem: weapon,
      });
    } else {
      otherHero.takeDirectDamage({ amount: 1 });
    }
  }

  private selfInflictDamage({
    entityThatOpenedTheChest,
  }: { entityThatOpenedTheChest: Hero }) {
    entityThatOpenedTheChest.takeDirectDamage({ amount: 1 });
  }
}
