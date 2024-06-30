import { Entity } from "src/modules/shared/domain/entity";
import { z } from "zod";
import { Playable } from "./playable-entity/playable-entity.abstract";
import { PlayableEntityError } from "./playable-entity/playable-entity.error";

type Data = {
  values: Array<Playable>;
};

export class PlayableEntities extends Entity<Data> {
  private static schema = z.object({
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
    const sortedValues = [...values].sort((a, b) =>
      a.initiative.compare(b.initiative),
    );

    const playingEntityIdx = values.findIndex((pc) => pc.isPlaying());
    if (playingEntityIdx < 0) {
      return sortedValues;
    }

    return [
      ...sortedValues.slice(playingEntityIdx + 1),
      ...sortedValues.slice(0, playingEntityIdx + 1),
    ];
  }

  public toPlain() {
    return {
      values: this._data.values.map((playableEntity) =>
        playableEntity.toPlain(),
      ),
    };
  }

  public getPlayingEntityOrThrow(): Playable {
    const playingEntity = this._data.values.find((playableEntity) =>
      playableEntity.isPlaying(),
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
}
