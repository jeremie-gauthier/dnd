import {
  AttackRangeType,
  PlayableEntityAttackInput,
  PlayableEntityRace,
  PlayableEntityRaceType,
  canAttackTarget,
  zip,
} from "@dnd/shared";
import { AggregateRoot } from "src/modules/shared/domain/aggregate-root";
import { z } from "zod";
import { Attack } from "../attack/attack.entity";
import { AttackError } from "../attack/attack.error";
import { Board } from "../board/board.entity";
import { Coord } from "../coord/coord.vo";
import { MonsterSpawnedDomainEvent } from "../domain-events/dtos/monster-spawned.dto";
import { PlayableEntityMovedDomainEvent } from "../domain-events/dtos/playable-entity-moved.dto";
import { GameEvents } from "../game-events/game-events.aggregate";
import { GameMaster } from "../game-master/game-master.entity";
import { GameStatus } from "../game-status/game-status.vo";
import { StorageSpace } from "../inventory/inventory.entity";
import { ChestTrap } from "../item/chest-trap/chest-trap.abstract";
import { Item } from "../item/item.abstract";
import { Potion } from "../item/potion/potion.abstract";
import { Spell } from "../item/spell/spell.entity";
import { Weapon } from "../item/weapon/weapon.entity";
import { MonsterTemplates } from "../monster-templates/monster-templates.aggregate";
import { PlayableEntities } from "../playable-entities/playable-entities.aggregate";
import { Hero } from "../playable-entities/playable-entity/heroes/hero.abstract";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { Rooms } from "../rooms/rooms.aggregate";
import { TilePlayableEntity } from "../tile/tile-entity/playable/playable.entity";
import { WinConditions } from "../win-conditions/win-conditions.aggregate";
import { GameError } from "./game.error";

type Data = {
  readonly id: string;
  host: {
    userId: string;
  };
  status: GameStatus;
  board: Board;
  playableEntities: PlayableEntities;
  gameMaster: GameMaster;
  monsterTemplates: MonsterTemplates;
  events: GameEvents;
  winConditions: WinConditions;
  readonly maxLevelLoot: number;
  itemsLooted: Array<Item["id"]>;
  rooms: Rooms;
  monstersKilled: Array<string>;
};

export class Game extends AggregateRoot<Data> {
  private static schema = z.object({
    id: z.string().uuid(),
    host: z.object({ userId: z.string() }),
    status: z.instanceof(GameStatus),
    board: z.instanceof(Board),
    playableEntities: z.instanceof(PlayableEntities),
    gameMaster: z.instanceof(GameMaster),
    monsterTemplates: z.instanceof(MonsterTemplates),
    events: z.instanceof(GameEvents),
    winConditions: z.instanceof(WinConditions),
    maxLevelLoot: z.number().min(1),
    itemsLooted: z.array(z.string()),
    rooms: z.instanceof(Rooms),
    monstersKilled: z.array(z.nativeEnum(PlayableEntityRace)),
  });

  constructor(rawData: Data) {
    const data = Game.schema.parse(rawData);
    super(data, data.id);
  }

  public get playableEntities() {
    return this._data.playableEntities;
  }

  public get rooms() {
    return this._data.rooms;
  }

  public get winConditions() {
    return this._data.winConditions;
  }

  public get board() {
    return this._data.board;
  }

  public popLastMonsterKilled() {
    return this._data.monstersKilled.pop();
  }

  public toPlain() {
    return {
      id: this._data.id,
      host: this._data.host,
      status: this._data.status.toPlain(),
      board: this._data.board.toPlain(),
      playableEntities: this._data.playableEntities.toPlain(),
      gameMaster: this._data.gameMaster.toPlain(),
      monsterTemplates: this._data.monsterTemplates.toPlain(),
      events: this._data.events.toPlain(),
      winConditions: this._data.winConditions.toPlain(),
      maxLevelLoot: this._data.maxLevelLoot,
      itemsLooted: this._data.itemsLooted,
      rooms: this._data.rooms.toPlain(),
      monstersKilled: this._data.monstersKilled,
    };
  }

  public isWin() {
    return this._data.winConditions.areWin();
  }

  public endPlayerTurn({ userId }: { userId: string }) {
    const playingEntity = this._data.playableEntities.getPlayingEntityOrThrow();
    playingEntity.mustBePlayedBy({ userId });
    playingEntity.endTurn();
    this.addDomainEvents(playingEntity.collectDomainEvents());

    // TODO: to delete
    const playingEntitiesWhoseTurnEnded: Playable[] = [playingEntity];
    // TODO: to delete
    const playingEntitiesWhoseTurnStarted: Playable[] = [];

    let hasFoundNextEntityAbleToPlay = false;
    while (!hasFoundNextEntityAbleToPlay) {
      const nextEntityToPlay =
        this._data.playableEntities.getNextEntityToPlay();
      if (!nextEntityToPlay) {
        break;
      }

      nextEntityToPlay.startTurn();
      this.addDomainEvents(nextEntityToPlay.collectDomainEvents());
      // TODO: to delete
      playingEntitiesWhoseTurnStarted.push(nextEntityToPlay);

      if (nextEntityToPlay.isPlaying) {
        hasFoundNextEntityAbleToPlay = true;
      } else {
        // TODO: to delete
        playingEntitiesWhoseTurnEnded.push(nextEntityToPlay);
      }

      this._data.playableEntities.incrementTimeline();
    }

    // TODO: to delete
    return {
      playingEntitiesWhoseTurnEnded,
      playingEntitiesWhoseTurnStarted,
    };
  }

  public movePlayableEntity({
    playableEntityId,
    destinationCoord,
  }: { playableEntityId: Playable["id"]; destinationCoord: Coord }) {
    this._data.board.mustBeAnAccessibleTile({ coord: destinationCoord });

    const playableEntity = this._data.playableEntities.getOneOrThrow({
      playableEntityId,
    });

    const tileEntity = new TilePlayableEntity({
      id: playableEntity.id,
      isBlocking: true,
      faction: playableEntity.faction,
    });
    if (!playableEntity.coord.isUndefined()) {
      this._data.board.removeEntityAtCoord({
        tileEntity,
        coord: playableEntity.coord,
      });
    }

    this._data.board.addEntityAtCoord({ tileEntity, coord: destinationCoord });
    playableEntity.setCoord(destinationCoord);
  }

  public rollInitiatives() {
    this._data.playableEntities.rollInitiatives();
    this.addDomainEvents(this._data.playableEntities.collectDomainEvents());
  }

  public spawnMonster({
    race,
    startingCoord,
  }: { race: PlayableEntityRaceType; startingCoord: Coord }) {
    const monsterTemplate =
      this._data.monsterTemplates.getMonsterTemplateOrThrow({ race });
    const monster = monsterTemplate.create({
      gameMasterUserId: this._data.gameMaster.id,
    });
    this._data.playableEntities.addPlayableEntity({
      playableEntity: monster,
    });
    this.movePlayableEntity({
      destinationCoord: startingCoord,
      playableEntityId: monster.id,
    });

    this.addDomainEvent(
      new MonsterSpawnedDomainEvent({ monster: monster.toPlain() }),
    );

    return monster;
  }

  public openDoor({
    userId,
    coordOfTileWithDoor,
  }: { userId: string; coordOfTileWithDoor: Coord }) {
    const playingEntity = this._data.playableEntities.getPlayingEntityOrThrow();
    playingEntity.mustBePlayedBy({ userId });
    playingEntity.act({ action: "open_door" });

    const tile = this._data.board.getTileOrThrow({
      coord: coordOfTileWithDoor,
    });
    tile.openDoor({ playableEntity: playingEntity });

    this.addDomainEvents(tile.collectDomainEvents());

    const doorOpeningEvents = this._data.events.getRelatedDoorOpeningEvents({
      doorCoord: coordOfTileWithDoor,
    });
    for (const doorOpeningEvent of doorOpeningEvents) {
      if (doorOpeningEvent.isSpawnMonsterAction()) {
        const monsterRaceWithStartingCoord = zip(
          doorOpeningEvent.monsters,
          doorOpeningEvent.startingTiles,
        );
        for (const [race, startingCoord] of monsterRaceWithStartingCoord) {
          this.spawnMonster({ race, startingCoord });
        }
      }
    }

    this.rollInitiatives();
  }

  public playerMove({
    userId,
    pathToTile,
  }: { pathToTile: Array<Coord>; userId: string }) {
    const playingEntity = this._data.playableEntities.getPlayingEntityOrThrow();
    playingEntity.mustBePlayedBy({ userId });
    playingEntity.act({ action: "move" });

    const path = pathToTile.map((coord) =>
      this._data.board.getTileOrThrow({ coord }),
    );
    const { validatedPath, trapTriggered } = playingEntity.getMovePath({
      path,
    });
    const destinationTile = validatedPath.at(-1);
    if (destinationTile) {
      this.movePlayableEntity({
        playableEntityId: playingEntity.id,
        destinationCoord: destinationTile.coord,
      });
      this.addDomainEvent(
        new PlayableEntityMovedDomainEvent({
          playableEntity: playingEntity.toPlain(),
        }),
      );
    }

    if (trapTriggered) {
      trapTriggered.onInteraction({ playableEntity: playingEntity });
      this.addDomainEvents(trapTriggered.collectDomainEvents());

      if (playingEntity.isDead) {
        this.endPlayerTurn({ userId });
      }
    }
  }

  public playerAttack({
    attackId,
    targetPlayableEntityId,
    userId,
  }: Pick<PlayableEntityAttackInput, "targetPlayableEntityId" | "attackId"> & {
    userId: string;
  }) {
    const playingEntity = this._data.playableEntities.getPlayingEntityOrThrow();
    playingEntity.mustBePlayedBy({ userId });
    playingEntity.act({ action: "attack" });

    const targetPlayableEntity = this._data.playableEntities.getOneOrThrow({
      playableEntityId: targetPlayableEntityId,
    });
    targetPlayableEntity.mustBeAlive();

    const attackItem = playingEntity.inventory.getAttackItemInGearOrThrow({
      attackId,
    });

    const { attack, attackResult, damageDone } = this.playableEntityAttack({
      attacker: playingEntity,
      defender: targetPlayableEntity,
      attackId,
      attackItem,
    });

    if (targetPlayableEntity.isDead && targetPlayableEntity.isMonster()) {
      this._data.monstersKilled.push(targetPlayableEntity.race);
      this._data.board.removeEntityAtCoord({
        tileEntity: new TilePlayableEntity({
          faction: targetPlayableEntity.faction,
          id: targetPlayableEntity.id,
          isBlocking: false,
        }),
        coord: targetPlayableEntity.coord,
      });
      this._data.playableEntities.removePlayableEntity({
        playableEntity: targetPlayableEntity,
      });
      this._data.winConditions.updateWinConditions({ eventName: "enemy_died" });
    }

    const turnEnded = playingEntity.isDead
      ? this.endPlayerTurn({ userId })
      : undefined;

    return {
      attack,
      attacker: playingEntity,
      attackItem,
      attackResult,
      damageDone,
      target: targetPlayableEntity,
      turnEnded,
    };
  }

  public playableEntityAttack({
    attacker,
    defender,
    attackItem,
    attackId,
  }: {
    attacker: Playable;
    attackItem: Spell | Weapon;
    attackId: Attack["id"];
    defender: Playable;
  }) {
    const attack = attackItem.getAttackOrThrow({ attackId });
    this.mustHaveTargetInRange({
      attacker,
      range: attack.range,
      targetCoord: defender.coord,
    });

    const attackResult = attacker.getAttackResult({
      attackId,
      attackItem,
    });
    if (attackResult.type === "Spell") {
      attacker.consumeMana({ amount: attackResult.manaCost });
    }

    attack.applyPerksToDicesResults({
      attacker,
      defender,
      dicesResults: attackResult.attackResult,
      itemUsed: attackItem,
    });

    defender.conditions.applyAllNextIncomingAttackConditions({
      playableEntityAffected: defender,
    });

    const damageDone = defender.takeDamage({
      amount: attackResult.attackResult.sumResult,
    });

    defender.conditions.clearExhausted({
      playableEntityAffected: defender,
    });

    return { attack, attackResult, damageDone };
  }

  private mustHaveTargetInRange({
    attacker,
    range,
    targetCoord,
  }: {
    attacker: Playable;
    range: AttackRangeType;
    targetCoord: Coord;
  }) {
    const plainBoard = this._data.board.toPlain();

    if (
      !canAttackTarget({
        ally: attacker.faction,
        gameBoard: plainBoard as any,
        attackerCoord: attacker.coord.toPlain(),
        range,
        targetCoord,
      })
    ) {
      throw new AttackError({
        name: "TARGET_OUT_OF_RANGE",
        message: "Target is out of range",
      });
    }
  }

  public playerLootItem({
    userId,
    item,
    replacedItemId,
    storageSpace,
  }: {
    userId: string;
    item: Item;
    replacedItemId?: Item["id"];
    storageSpace: StorageSpace;
  }) {
    const playingEntity = this._data.playableEntities.getPlayingEntityOrThrow();
    playingEntity.mustBeHero();
    playingEntity.mustBePlayedBy({ userId });
    playingEntity.mustBeLooting();

    const isExpectedItemId = this._data.itemsLooted.at(-1) === item.id;
    if (!isExpectedItemId) {
      throw new GameError({
        name: "UNEXPECTED_LOOT_ITEM",
        message: "Player tried to loot an invalid item",
      });
    }

    if (replacedItemId) {
      const replacedItem = playingEntity.inventory.getItemInInventoryOrThrow({
        itemId: replacedItemId,
      });
      playingEntity.inventory.mustHaveItemInStorageSpace({
        item: replacedItem,
        storageSpace,
      });

      playingEntity.inventory.removeItemFromInventory({ item: replacedItem });
    }

    playingEntity.inventory.addItemInStorageSpace({ item, storageSpace });
  }

  public playerTriggeredAChestTrap({
    userId,
    chestTrap,
  }: { userId: string; chestTrap: ChestTrap }) {
    const playingEntity = this._data.playableEntities.getPlayingEntityOrThrow();
    playingEntity.mustBeHero();
    playingEntity.mustBePlayedBy({ userId });
    playingEntity.mustBeLooting();

    const isExpectedItemId = this._data.itemsLooted.at(-1) === chestTrap.id;
    if (!isExpectedItemId) {
      throw new GameError({
        name: "UNEXPECTED_LOOT_ITEM",
        message: "Player tried to loot an invalid item",
      });
    }

    const isHeroProtectedAgainstTraps =
      playingEntity.conditions.hasTrapProtection();

    if (isHeroProtectedAgainstTraps) {
      playingEntity.conditions.applyAllNextTrapOrChestTrap({
        playableEntityAffected: playingEntity,
      });
      playingEntity.conditions.clearExhausted({
        playableEntityAffected: playingEntity,
      });
      return;
    } else {
      chestTrap.use({
        entityThatOpenedTheChest: playingEntity as Hero,
        game: this,
      });
      const turnEnded = this.endPlayerTurn({ userId });

      return { ...turnEnded, entityThatTriggeredTheChestTrap: playingEntity };
    }
  }

  public playerDeleteItem({
    userId,
    itemId,
  }: { userId: string; itemId: Item["id"] }) {
    const playingEntity = this._data.playableEntities.getPlayingEntityOrThrow();
    playingEntity.mustBePlayedBy({ userId });
    const item = playingEntity.inventory.getItemInInventoryOrThrow({ itemId });
    playingEntity.act({ action: "delete_item" });

    playingEntity.inventory.removeItemFromInventory({ item });
  }

  public playerSwapItems({
    userId,
    gearItemId,
    backpackItemId,
  }: { userId: string; gearItemId?: Item["id"]; backpackItemId?: Item["id"] }) {
    if (!gearItemId && !backpackItemId) {
      return;
    }

    const playingEntity = this._data.playableEntities.getPlayingEntityOrThrow();
    playingEntity.mustBePlayedBy({ userId });
    playingEntity.act({ action: "swap_items" });

    const backpackItem = backpackItemId
      ? playingEntity.inventory.getItemInInventoryOrThrow({
          itemId: backpackItemId,
        })
      : undefined;
    const gearItem = gearItemId
      ? playingEntity.inventory.getItemInInventoryOrThrow({
          itemId: gearItemId,
        })
      : undefined;
    playingEntity.inventory.swapItemsFromStorageSpaces({
      backpackItem,
      gearItem,
    });
  }

  public playerOpenChest({
    userId,
    coordOfTileWithChest,
  }: { userId: string; coordOfTileWithChest: Coord }) {
    const playingEntity = this._data.playableEntities.getPlayingEntityOrThrow();
    playingEntity.mustBeHero();
    playingEntity.mustBePlayedBy({ userId });
    playingEntity.act({ action: "open_chest" });

    const tile = this._data.board.getTileOrThrow({
      coord: coordOfTileWithChest,
    });
    tile.openChest({ playableEntity: playingEntity });

    return {
      maxLevelLoot: this._data.maxLevelLoot,
      itemsLooted: this._data.itemsLooted,
      hostUserId: this._data.host.userId,
    };
  }

  public markItemAsLooted({ item }: { item: Item }) {
    this._data.itemsLooted.push(item.toPlain().name);
  }

  public playerDrinkPotion({
    userId,
    itemId,
  }: { userId: string; itemId: Item["id"] }) {
    const playingEntity = this._data.playableEntities.getPlayingEntityOrThrow();
    playingEntity.mustBeHero();
    playingEntity.mustBePlayedBy({ userId });

    const item = playingEntity.inventory.getItemInInventoryOrThrow({ itemId });
    item.mustBePotion();

    (item as Potion).use({
      game: this,
      playableEntity: playingEntity as Hero,
    });

    playingEntity.inventory.removeItemFromInventory({ item });
  }
}
