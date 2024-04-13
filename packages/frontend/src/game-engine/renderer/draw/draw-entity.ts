import type { GameEntity } from "@dnd/shared";
import { entitiesAssetsCollection } from "../assets-loader/assets.config";
import { drawDoor } from "./entities/draw-door";
import { drawPillar } from "./entities/draw-pillar";
import { drawPlayableEntityIcon } from "./entities/draw-playable-entity-icon";
import { drawWall } from "./entities/draw-wall";
import type { EntityDrawerParams } from "./entities/entity-drawer-params.interface";

type Params = Pick<
  EntityDrawerParams<typeof entitiesAssetsCollection>,
  "config" | "context"
> & {
  subject: Pick<
    EntityDrawerParams["subject"],
    "coord2D" | "coordIsometric" | "entity"
  >;
  playableEntities: GameEntity["playableEntities"];
};

type DrawFn = (_: EntityDrawerParams) => void;

export const drawEntity = ({
  context,
  config,
  subject,
  playableEntities,
}: Params) => {
  if (subject.entity.type === "playable-entity") {
    const playableEntity = playableEntities[subject.entity.id];
    drawPlayableEntityIcon({
      context,
      config,
      subject: {
        ...subject,
        playableEntity,
      },
    });
  } else {
    // @ts-ignore array accessor
    const drawer = ENTITY_MAP[subject.entity.type][
      subject.entity.kind
    ] as DrawFn;
    drawer({ context, config, subject });
  }
};

const dummyDrawer = (_: EntityDrawerParams) => {};

const ENTITY_MAP = {
  "non-playable-interactive-entity": {
    door: drawDoor,
    trap: dummyDrawer,
  },
  "non-playable-non-interactive-entity": {
    "off-map": dummyDrawer,
    pillar: drawPillar,
    tree: dummyDrawer,
    wall: drawWall,
  },
} as const;
