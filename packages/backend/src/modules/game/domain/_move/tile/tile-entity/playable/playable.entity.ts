import { PlayableEntity } from "src/modules/game/infra/database/entities/game-entity/playable-entity/playable-entity.entity";
import {
  PlayableEntityFaction,
  PlayableEntityFactionType,
} from "src/modules/game/infra/database/enums/playable-entity-faction.enum";
import { EntityType } from "src/modules/game/infra/database/enums/tile-entity-type.enum";
import { z } from "zod";
import { TileEntity } from "../tile-entity.abstract";

type Data = {
  readonly type: "PLAYABLE_ENTITY";
  readonly id: PlayableEntity["id"];
  readonly isBlocking: boolean;
  readonly faction: PlayableEntityFactionType;
};

export class TilePlayableEntity extends TileEntity<Data> {
  private static readonly schema = z.object({
    type: z
      .literal(EntityType.PLAYABLE_ENTITY)
      .optional()
      .default(EntityType.PLAYABLE_ENTITY),
    id: z.string().uuid(),
    isBlocking: z.boolean(),
    faction: z.enum([
      PlayableEntityFaction.HERO,
      PlayableEntityFaction.MONSTER,
    ]),
  });

  constructor(rawData: Omit<Data, "type">) {
    const data = TilePlayableEntity.schema.parse(rawData);
    super(data);
  }

  //#region Getters

  public get faction() {
    return this._data.faction;
  }

  // #region Methods

  public isMonster() {
    return this._data.faction === PlayableEntityFaction.MONSTER;
  }

  public isHero() {
    return this._data.faction === PlayableEntityFaction.HERO;
  }

  public override toPlain() {
    return {} as any;
  }
}
