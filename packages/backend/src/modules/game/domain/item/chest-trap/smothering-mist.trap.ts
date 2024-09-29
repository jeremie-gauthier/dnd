import { Game } from "../../game/game.aggregate";
import { Playable } from "../../playable-entities/playable-entity/playable-entity.abstract";
import { ChestTrap } from "./chest-trap.abstract";

export class SmotheringMist extends ChestTrap {
  constructor() {
    super({ level: 1, name: "smothering_mist_1" });
  }

  public use({
    entityThatOpenedTheChest,
    game,
  }: {
    entityThatOpenedTheChest: Playable;
    game: Game;
  }): void {
    const room = game.rooms.getRoomOrThrow({
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
