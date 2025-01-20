import { Coord } from "../../coord/coord.vo";
import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { pathfinder } from "../../services/pathfinder/pathfinder";
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
    if (otherHeroes.length === 0) {
      this.selfInflictDamage({ entityThatOpenedTheChest });
      return;
    }

    const grid = game.board.to2DArray();
    const pathToNearestTileAdjacentToAnotherAliveHero = pathfinder({
      grid,
      startCoord: entityThatOpenedTheChest.coord,
      hasReachGoal(node, _coord) {
        return otherHeroes.some((otherHero) =>
          node.coord.isAdjacentTo(otherHero.coord),
        );
      },
      heuristic(node, _coord) {
        const manhattanDistances = otherHeroes.map((otherHero) =>
          node.coord.getManhattanDistanceTo(otherHero.coord),
        );
        manhattanDistances.sort();
        const shortestDistance = manhattanDistances[0]!;
        return shortestDistance;
      },
      options: {
        canVisitNode(node) {
          return !node.entities
            .filter(
              (tileEntity) => !(tileEntity.isPlayable() && tileEntity.isHero()),
            )
            .some((tileEntity) => tileEntity.isBlocking);
        },
      },
    });

    const tileAdjacentToAnotherAliveHero =
      pathToNearestTileAdjacentToAnotherAliveHero?.at(-1);
    if (!tileAdjacentToAnotherAliveHero) {
      this.selfInflictDamage({ entityThatOpenedTheChest });
      return;
    }

    const destinationCoord = new Coord(tileAdjacentToAnotherAliveHero);
    if (!entityThatOpenedTheChest.coord.equals(destinationCoord)) {
      game.movePlayableEntity({
        playableEntityId: entityThatOpenedTheChest.id,
        destinationCoord,
      });
    }
    const otherHero = otherHeroes.find((otherHero) =>
      otherHero.coord.isAdjacentTo(destinationCoord),
    )!;
    this.inflictDamageToOtherHero({
      entityThatOpenedTheChest,
      otherHero,
      game,
    });
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
