import { zip } from "@dnd/shared";
import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { InitiativesRerolledDomainEvent } from "../domain-events/dtos/initiatives-rerolled.dto";
import { Room } from "../rooms/room/room.entity";
import { randomIndex } from "../services/random/random-index";
import { shuffleArray } from "../services/random/shuffle-array";
import { Hero } from "./playable-entity/heroes/hero.abstract";
import { Monster } from "./playable-entity/monster.entity";
import { Playable } from "./playable-entity/playable-entity.abstract";
import { PlayableEntityError } from "./playable-entity/playable-entity.error";

type Data = {
  values: Array<Playable>;
};

export class PlayableEntities extends Entity<Data> {
  private static readonly schema = z.object({
    values: z.array(z.instanceof(Playable)).min(4),
  });

  constructor(rawData: Data) {
    const data = PlayableEntities.schema.parse(rawData);
    super(data);

    data.values = this.toSortedValuesAsRelativeTimeline({
      values: data.values,
    });
  }

  public get isEveryoneDead() {
    return this._data.values.every((pc) => pc.isDead);
  }

  private toSortedValuesAsRelativeTimeline({
    values,
  }: { values: Data["values"] }): Data["values"] {
    const sortedValues = [...values].toSorted((a, b) =>
      b.initiative.compare(a.initiative),
    );

    const playingEntityIdx = sortedValues.findIndex((pc) => pc.isPlaying);
    if (playingEntityIdx < 0) {
      return sortedValues;
    }

    return [
      ...sortedValues.slice(playingEntityIdx + 1),
      ...sortedValues.slice(0, playingEntityIdx + 1),
    ];
  }

  public incrementTimeline() {
    this._data.values = [
      ...this._data.values.slice(1),
      ...this._data.values.slice(0, 1),
    ];
  }

  public getOtherAlivedHeroes({ hero }: { hero: Hero }) {
    return this._data.values.filter(
      (value): value is Hero =>
        value.isHero() && !hero.equals(value) && value.isAlive,
    );
  }

  public getMonsters() {
    return this._data.values.filter((value) => value.isMonster());
  }

  public override toPlain() {
    return {
      values: this._data.values.map((playableEntity) =>
        playableEntity.toPlain(),
      ),
    };
  }

  public getOneOrThrow({
    playableEntityId,
  }: { playableEntityId: Playable["id"] }) {
    const playableEntity = this._data.values.find(
      (playableEntity) => playableEntity.id === playableEntityId,
    );
    if (!playableEntity) {
      throw new PlayableEntityError({
        name: "PLAYABLE_ENTITY_NOT_FOUND",
        message: "Playable Entity not found",
      });
    }
    return playableEntity;
  }

  public getPlayingEntityOrThrow(): Playable {
    const playingEntity = this._data.values.find(
      (playableEntity) => playableEntity.isPlaying,
    );
    if (!playingEntity) {
      throw new PlayableEntityError({
        name: "PLAYABLE_ENTITY_NOT_FOUND",
        message: "Playable Entity not found",
      });
    }
    return playingEntity;
  }

  public getNextEntityToPlay(): Playable | undefined {
    if (this.isEveryoneDead) return;
    return this._data.values.find((pc) => pc.isAlive);
  }

  public rollInitiatives() {
    const initiatives = Array.from({ length: this._data.values.length }).map(
      (_, idx) => idx + 1,
    );
    shuffleArray(initiatives);

    this.addDomainEvent(new InitiativesRerolledDomainEvent());

    for (const [playableEntity, initiativeScore] of zip(
      this._data.values,
      initiatives,
    )) {
      playableEntity.setInitiative(initiativeScore);
      if (playableEntity.isPlaying) {
        playableEntity.endTurn();
        this.addDomainEvents(playableEntity.collectDomainEvents());
      }
    }

    this._data.values = this.toSortedValuesAsRelativeTimeline({
      values: this._data.values,
    });

    const nextEntityToPlay = this.getNextEntityToPlay();
    if (nextEntityToPlay) {
      nextEntityToPlay.startTurn();
      this.addDomainEvents(nextEntityToPlay.collectDomainEvents());
    }
  }

  public addPlayableEntity({ playableEntity }: { playableEntity: Playable }) {
    this._data.values.push(playableEntity);
  }

  public removePlayableEntity({
    playableEntity,
  }: { playableEntity: Playable }) {
    this._data.values = this._data.values.filter(
      ({ id }) => id !== playableEntity.id,
    );
  }

  public getAllPlayableEntitiesInRoom({ room }: { room: Room }) {
    return this._data.values.filter((playableEntity) =>
      room.contains({ coord: playableEntity.coord }),
    );
  }

  public getRandomMonsterOrThrow(): Monster {
    const monsters = this.getMonsters();
    const randIndex = randomIndex(monsters.length);
    const randomMonster = monsters[randIndex];

    if (!randomMonster) {
      throw new PlayableEntityError({
        name: "NO_ALIVE_MONSTER_FOUND",
        message: "No Monster alive",
      });
    }

    return randomMonster;
  }
}
