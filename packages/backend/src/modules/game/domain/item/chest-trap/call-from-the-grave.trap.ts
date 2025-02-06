import { Coord } from "../../coord/coord.vo";
import { Game } from "../../game/game.aggregate";
import { Inventory } from "../../inventory/inventory.entity";
import { MonsterTemplate } from "../../monster-templates/monster-template/monster-template.vo";
import { Hero } from "../../playable-entities/playable-entity/heroes/hero.abstract";
import { randomIndex } from "../../services/random/random-index";
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
      startingCoord: startingCoord,
      // TODO: faire fonctionner ce truc
      monsterTemplate: new MonsterTemplate({
        characteristic: {
          baseActionPoints: 2,
          baseArmorClass: 1,
          baseHealthPoints: 6,
          baseManaPoints: 0,
          baseMovementPoints: 4,
        },
        inventory: new Inventory({
          backpack: [],
          gear: [],
          playableId: "0",
          storageCapacity: {
            nbArtifactSlots: 0,
            nbBackpackSlots: 0,
            nbSpellSlots: 0,
            nbWeaponSlots: 0,
          },
        }),
        race: "goblin",
        type: "gobelinoid",
      }),
    });

    game.winConditions.updateWinConditions({ eventName: "enemy_resurrected" });
  }

  private getRandomAccessibleCoordInRoom({
    entityThatOpenedTheChestCoord,
    game,
  }: { entityThatOpenedTheChestCoord: Coord; game: Game }): Coord {
    const room = game.board.rooms.getRoomOrThrow({
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

    const randIndex = randomIndex(accessibleRoomCoords.length);
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
