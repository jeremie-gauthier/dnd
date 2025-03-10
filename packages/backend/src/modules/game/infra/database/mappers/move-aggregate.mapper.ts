import { Injectable, NotImplementedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Board as BoardDomain } from "src/modules/game/domain/_move/board/board.entity";
import {
  Move,
  Move as MoveDomain,
} from "src/modules/game/domain/_move/move.aggregate";
import { HeroMoveBehaviour } from "src/modules/game/domain/_move/playable/move-behaviours/hero-move.behaviour";
import { LiddaMoveBehaviour } from "src/modules/game/domain/_move/playable/move-behaviours/lidda-move.behaviour";
import { MonsterMoveBehaviour } from "src/modules/game/domain/_move/playable/move-behaviours/monster-move.behaviour";
import { MoveBehaviour } from "src/modules/game/domain/_move/playable/move-behaviours/move-behaviour.interface";
import { Playable } from "src/modules/game/domain/_move/playable/playable.entity";
import { TileNonPlayableEntity } from "src/modules/game/domain/_move/tile/tile-entity/non-playable/non-playable.entity";
import { TilePlayableEntity } from "src/modules/game/domain/_move/tile/tile-entity/playable/playable.entity";
import { Tile } from "src/modules/game/domain/_move/tile/tile.entity";
import { Coord } from "src/modules/game/domain/common/coord/coord.vo";
import { PlayerStatus } from "src/modules/game/domain/common/player-status/player-status.vo";
import { ArrayCollection } from "src/modules/shared/domain/collections/array.collection";
import { Mapper } from "src/modules/shared/infra/mapper";
import { Repository } from "typeorm";
import { PlayableEntity as PlayableEntityPersistence } from "../entities/game-entity/playable-entity/playable-entity.entity";
import { Game as GamePersistence } from "../entities/game.entity";
import { PlayableEntityFaction } from "../enums/playable-entity-faction.enum";

@Injectable()
export class MoveAggregateMapper extends Mapper<GamePersistence, MoveDomain> {
  constructor(
    @InjectRepository(GamePersistence)
    private readonly gameRepository: Repository<GamePersistence>,
  ) {
    super();
  }

  public toDomain(persistence: GamePersistence): MoveDomain {
    const playableEntities = persistence.board.tiles.flatMap(
      (tile) => tile.playableEntities,
    );

    return new Move({
      gameId: persistence.id,
      board: new BoardDomain({
        height: persistence.board.height,
        width: persistence.board.width,
        tiles: new ArrayCollection(
          persistence.board.tiles.map((tile) => {
            return new Tile({
              coord: new Coord(tile.coord),
              entities: new ArrayCollection([
                ...tile.interactiveEntities.map(
                  (nonPlayableEntity) =>
                    new TileNonPlayableEntity({
                      type: nonPlayableEntity.type,
                      kind: nonPlayableEntity.kind,
                      canInteract: nonPlayableEntity.canInteract,
                      isBlocking: nonPlayableEntity.isBlocking,
                    }),
                ),
                ...tile.nonInteractiveEntities.map(
                  (nonPlayableEntity) =>
                    new TileNonPlayableEntity({
                      type: nonPlayableEntity.type,
                      kind: nonPlayableEntity.kind,
                      canInteract: false,
                      isBlocking: true,
                    }),
                ),
                ...tile.playableEntities.map(
                  (playableEntity) =>
                    new TilePlayableEntity({
                      faction: playableEntity.faction,
                      id: playableEntity.id,
                      isBlocking: playableEntity.isBlocking,
                    }),
                ),
              ]),
              isStartingTile: tile.isStartingTile,
            });
          }),
        ),
      }),
      playableEntities: new ArrayCollection(
        playableEntities.map((playable) => {
          return new Playable(
            {
              actionsDoneThisTurn: playable.actionsDoneThisTurn,
              baseCharacteristic: {
                actionPoints: playable.baseCharacteristic.actionPoints,
                healthPoints: playable.baseCharacteristic.healthPoints,
                movementPoints: playable.baseCharacteristic.movementPoints,
              },
              characteristic: {
                actionPoints: playable.characteristic.actionPoints,
                healthPoints: playable.characteristic.healthPoints,
                movementPoints: playable.characteristic.movementPoints,
              },
              coord: new Coord(playable.coord),
              faction: playable.faction,
              id: playable.id,
              isBlocking: playable.isBlocking,
              playedByUserId: playable.playedByUserId,
              status: new PlayerStatus(playable.currentPhase),
              type: playable.type,
            },
            this.getMoveBehaviour(playable),
          );
        }),
      ),
    });
  }

  private getMoveBehaviour(playable: PlayableEntityPersistence): MoveBehaviour {
    if (playable.faction === PlayableEntityFaction.MONSTER) {
      return new MonsterMoveBehaviour();
    }

    if (playable.faction === PlayableEntityFaction.HERO) {
      if (playable.name === "Lidda") {
        return new LiddaMoveBehaviour();
      }

      return new HeroMoveBehaviour();
    }

    throw new NotImplementedException(
      `No move behaviour found for faction '${playable.faction}'`,
    );
  }

  public toPersistence(domain: MoveDomain): GamePersistence {
    const persistence = this.gameRepository.create({
      id: domain.gameId,
      board: {
        id: domain.board.id,
        height: domain.board.height,
        width: domain.board.width,
        tiles: domain.board.tiles.getAll().map((tileDomain) => {
          return {
            id: tileDomain.id,
            playableEntities: tileDomain.entities
              .getAll()
              .filter((tileEntityDomain) => tileEntityDomain.isPlayable())
              .map((tilePlayableDomain) => {
                const playableDomain = domain.playableEntities.getOneOrThrow(
                  tilePlayableDomain.id,
                );
                return {
                  id: playableDomain.id,
                  coord: playableDomain.coord,
                  actionsDoneThisTurn: playableDomain.actionsDoneThisTurn,
                };
              }),
          };
        }),
      },
    });

    return persistence;
  }
}
