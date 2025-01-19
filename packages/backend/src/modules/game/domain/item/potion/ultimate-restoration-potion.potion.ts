import { Coord } from "../../coord/coord.vo";
import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion } from "./potion.abstract";
import { PotionError } from "./potion.error";

export class UltimateRestorationPotion extends Potion {
  constructor() {
    super({ level: 1, name: "ultimate_restoration_potion_1" });
  }

  public override use({
    playableEntity,
    game,
  }: {
    playableEntity: Hero;
    game: Game;
  }): void {
    const deadHero = this.getFirstAdjacentDeadHero({
      coord: playableEntity.coord,
      game,
    });
    if (!deadHero) {
      throw new PotionError({
        name: "INVALID_USAGE",
        message: `No dead hero found adjacent to ${playableEntity.coord}`,
      });
    }

    deadHero.revive({ amountHealthPoints: 4, amountManaPoints: 4 });
  }

  private getFirstAdjacentDeadHero({
    coord,
    game,
  }: { coord: Coord; game: Game }) {
    const neighbourCoords = coord.getNeighbours();

    for (const neighbourCoord of neighbourCoords) {
      const tile = game.board.getTileOrThrow({ coord: neighbourCoord });
      const tileEntityHero = tile.entities.find(
        (entity) => entity.isPlayable() && entity.isHero(),
      );
      if (!tileEntityHero) {
        continue;
      }

      try {
        const hero = game.playableEntities.getOneOrThrow({
          playableEntityId: tileEntityHero.id,
        }) as Hero;
        if (hero.isDead) {
          return hero;
        }
      } catch {}
    }
  }
}
