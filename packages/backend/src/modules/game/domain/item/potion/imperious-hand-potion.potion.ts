import { Coord } from "../../coord/coord.vo";
import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { randomIndex } from "../../services/random/random-index";
import { shuffleArray } from "../../services/random/shuffle-array";
import { Potion } from "./potion.abstract";
import { PotionError } from "./potion.error";

export class ImperiousHandPotion extends Potion {
  constructor() {
    super({ level: 1, name: "imperious_hand_potion_1" });
  }

  public override use({
    game,
  }: {
    playableEntity: Hero;
    game: Game;
  }): void {
    const monsters = game.playableEntities.getMonsters();
    shuffleArray(monsters);

    if (monsters.length === 0) {
      throw new PotionError({
        name: "INVALID_USAGE",
        message: "No Monster alive",
      });
    }

    for (const monster of monsters) {
      try {
        const randomAccessibleRoomCoord = this.getRandomAccessibleCoordInRoom({
          monsterCoord: monster.coord,
          game,
        });
        game.movePlayableEntity({
          playableEntityId: monster.id,
          destinationCoord: randomAccessibleRoomCoord,
        });
        return;
      } catch {}
    }
  }

  private getRandomAccessibleCoordInRoom({
    monsterCoord,
    game,
  }: { monsterCoord: Coord; game: Game }): Coord {
    const room = game.board.rooms.getRoomOrThrow({
      coord: monsterCoord,
    });

    const roomCoords = room.getContainedCoords();
    const accessibleRoomCoords = roomCoords.filter((coord) => {
      try {
        game.board.mustBeAnAccessibleTile({ coord });
        return true;
      } catch (error) {
        return false;
      }
    });

    const randIndex = randomIndex(accessibleRoomCoords.length);
    const coord = accessibleRoomCoords[randIndex];
    if (!coord) {
      throw new PotionError({
        name: "COULD_NOT_FOUND_ACCESSIBLE_TILE",
        message: "Failed to find a random accessible room coord",
      });
    }

    return coord;
  }
}
