import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { ChestTrap, ChestTrapData } from "./chest-trap.abstract";

export class SmotheringMist extends ChestTrap {
  constructor(rawData: Omit<ChestTrapData, "name" | "type">) {
    super({ ...rawData, name: "smothering_mist_1" });
  }

  public override use({
    entityThatOpenedTheChest,
    game,
  }: {
    entityThatOpenedTheChest: Hero;
    game: Game;
  }): void {
    const room = game.board.rooms.getRoomOrThrow({
      coord: entityThatOpenedTheChest.coord,
    });
    const playableEntitiesInRoom =
      game.playableEntities.getAllPlayableEntitiesInRoom({ room });

    const trappedEntities = playableEntitiesInRoom.filter(
      (playableEntity) => playableEntity.isAlive && !playableEntity.isUndead(),
    );

    for (const trappedEntity of trappedEntities) {
      trappedEntity.takeDirectDamage({ amount: 1 });
    }
  }
}
