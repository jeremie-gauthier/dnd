import { Game } from "../../game/game.aggregate";
import { DoubleMovementPoints } from "../../playable-entities/playable-entity/conditions/double-movement-points.condition";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { Potion } from "./potion.abstract";

export class SmokeShadowPotion extends Potion {
  constructor() {
    super({ level: 1, name: "smoke_shadow_potion_1" });
  }

  public override use({
    playableEntity,
    game,
  }: {
    playableEntity: Hero;
    game: Game;
  }): void {
    const room = game.board.rooms.getRoomOrThrow({
      coord: playableEntity.coord,
    });
    const heroesInTheRoom = game.playableEntities
      .getAllPlayableEntitiesInRoom({
        room,
      })
      .filter(
        (playableEntity) => playableEntity.isHero() && playableEntity.isAlive,
      );

    for (const hero of heroesInTheRoom) {
      hero.addCondition(
        new DoubleMovementPoints({
          remainingTurns: 2,
          playableEntityAffected: hero,
        }),
      );
    }
  }
}
