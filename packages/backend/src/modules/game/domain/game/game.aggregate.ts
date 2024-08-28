import {
  AttackRangeType,
  PlayableEntityAttackInput,
  PlayableEntityMoveInput,
  canAttackTarget,
  unfoldTilePath,
  zip,
} from "@dnd/shared";
import { AggregateRoot } from "src/modules/shared/domain/aggregate-root";
import { z } from "zod";
import { AttackError } from "../attack/attack.error";
import { Board } from "../board/board.entity";
import { Coord } from "../coord/coord.vo";
import { GameEvents } from "../game-events/game-events.aggregate";
import { GameMaster } from "../game-master/game-master.entity";
import { GameStatus } from "../game-status/game-status.vo";
import { MonsterTemplates } from "../monster-templates/monster-templates.aggregate";
import { PlayableEntities } from "../playable-entities/playable-entities.aggregate";
import { Monster } from "../playable-entities/playable-entity/monster.entity";
import { Playable } from "../playable-entities/playable-entity/playable-entity.abstract";
import { TilePlayableEntity } from "../tile/tile-entity/playable/playable.entity";
import { WinConditions } from "../win-conditions/win-conditions.aggregate";

type Data = {
  readonly id: string;
  status: GameStatus;
  board: Board;
  playableEntities: PlayableEntities;
  gameMaster: GameMaster;
  monsterTemplates: MonsterTemplates;
  events: GameEvents;
  winConditions: WinConditions;
};

export class Game extends AggregateRoot<Data> {
  private static schema = z.object({
    id: z.string().uuid(),
    status: z.instanceof(GameStatus),
    board: z.instanceof(Board),
    playableEntities: z.instanceof(PlayableEntities),
    gameMaster: z.instanceof(GameMaster),
    monsterTemplates: z.instanceof(MonsterTemplates),
    events: z.instanceof(GameEvents),
    winConditions: z.instanceof(WinConditions),
  });

  constructor(rawData: Data) {
    const data = Game.schema.parse(rawData);
    super(data, data.id);
  }

  public toPlain() {
    return {
      id: this._data.id,
      status: this._data.status.toPlain(),
      board: this._data.board.toPlain(),
      playableEntities: this._data.playableEntities.toPlain(),
      gameMaster: this._data.gameMaster.toPlain(),
      monsterTemplates: this._data.monsterTemplates.toPlain(),
      events: this._data.events.toPlain(),
      winConditions: this._data.winConditions.toPlain(),
    };
  }

  public isWin() {
    return this._data.winConditions.areWin();
  }

  public endPlayerTurn({ userId }: { userId: string }) {
    const playingEntity = this._data.playableEntities.getPlayingEntityOrThrow();
    playingEntity.mustBePlayedBy({ userId });
    const nextEntityToPlay = this._data.playableEntities.getNextEntityToPlay();

    playingEntity.endTurn();
    nextEntityToPlay?.startTurn();

    return {
      playingEntityWhoseTurnEnded: playingEntity,
      playingEntityWhoseTurnStarted: nextEntityToPlay,
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

    // ! GAME EVENTS (refacto this)
    const monstersSpawned: Monster[] = [];
    const doorOpeningEvents = this._data.events.getRelatedDoorOpeningEvents({
      doorCoord: coordOfTileWithDoor,
    });
    for (const doorOpeningEvent of doorOpeningEvents) {
      if (doorOpeningEvent.isSpawnMonsterAction()) {
        const monsterKindWithStartingCoord = zip(
          doorOpeningEvent.monsters,
          doorOpeningEvent.startingTiles,
        );
        for (const [kind, startingCoord] of monsterKindWithStartingCoord) {
          const monsterTemplate =
            this._data.monsterTemplates.getMonsterTemplateOrThrow({ kind });
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

          monstersSpawned.push(monster);
        }
      }
    }
    // ! -- GAME EVENTS (refacto this)

    this.rollInitiatives();

    return {
      entityThatOpenedTheDoor: playingEntity,
      playingEntityWhoseTurnStarted:
        this._data.playableEntities.getPlayingEntityOrThrow(),
      monstersSpawned,
    };
  }

  public playerMove({
    userId,
    pathToTile,
  }: Pick<PlayableEntityMoveInput, "pathToTile"> & { userId: string }) {
    const playingEntity = this._data.playableEntities.getPlayingEntityOrThrow();
    playingEntity.mustBePlayedBy({ userId });
    playingEntity.act({ action: "move" });

    const path = unfoldTilePath(pathToTile)
      .slice(1)
      .map((tile) =>
        this._data.board.getTileOrThrow({ coord: new Coord(tile.coord) }),
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
    }

    if (trapTriggered) {
      trapTriggered.onInteraction({ playableEntity: playingEntity });
    }

    return { playingEntity };
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

    const attack = attackItem.getAttackOrThrow({ attackId });
    this.mustHaveTargetInRange({
      attacker: playingEntity,
      range: attack.range,
      targetCoord: targetPlayableEntity.coord,
    });

    const attackResult = playingEntity.getAttackResult({
      attackId,
      attackItem,
    });
    if (attackResult.type === "Spell") {
      playingEntity.consumeMana({ amount: attackResult.manaCost });
    }

    const damageDone = targetPlayableEntity.takeDamage({
      amount: attackResult.attackResult.sumResult,
    });

    if (targetPlayableEntity.isDead && targetPlayableEntity.isMonster()) {
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

    return {
      attack,
      attacker: playingEntity,
      attackItem,
      attackResult,
      damageDone,
      target: targetPlayableEntity,
    };
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
}
