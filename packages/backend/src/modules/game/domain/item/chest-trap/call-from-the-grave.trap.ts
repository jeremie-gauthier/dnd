import { PlayableEntityRaceType } from "@dnd/shared";
import { Coord } from "../../coord/coord.vo";
import { Game } from "../../game/game.aggregate";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { ChestTrap } from "./chest-trap.abstract";
import { ChestTrapError } from "./chest-trap.error";

export class CallFromTheGrave extends ChestTrap {
  constructor() {
    super({ level: 1, name: "call_from_the_grave_1" });
  }

  public override use({
    entityThatOpenedTheChest,
    game,
  }: {
    entityThatOpenedTheChest: Hero;
    game: Game;
  }): void {
    const lastMonsterKilled = game.popLastMonsterKilled();
    if (!lastMonsterKilled) {
      return;
    }

    const startingCoord = this.getRandomAccessibleCoordInRoom({
      entityThatOpenedTheChestCoord: entityThatOpenedTheChest.coord,
      game,
    });
    game.spawnMonster({
      race: lastMonsterKilled as PlayableEntityRaceType,
      startingCoord: startingCoord,
    });

    game.winConditions.updateWinConditions({ eventName: "enemy_resurrected" });
  }

  private getRandomAccessibleCoordInRoom({
    entityThatOpenedTheChestCoord,
    game,
  }: { entityThatOpenedTheChestCoord: Coord; game: Game }): Coord {
    const room = game.rooms.getRoomOrThrow({
      coord: entityThatOpenedTheChestCoord,
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

    const randIndex = Math.trunc(Math.random() * accessibleRoomCoords.length);
    const coord = accessibleRoomCoords[randIndex];
    if (!coord) {
      throw new ChestTrapError({
        name: "COULD_NOT_FOUND_ACCESSIBLE_TILE",
        message: "Failed to find a random accessible room coord",
      });
    }

    return coord;
  }
}
