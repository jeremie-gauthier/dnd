import { TileEntityTypePlayableEntity } from "@/openapi/dnd-api";
import { PlayableEntity } from "@features/game/interfaces/dnd-api/playable-entity.interface";
import { entitiesAssetsCollection } from "../assets-loader/assets.config";
import { drawChest } from "./entities/draw-chest";
import { drawDoor } from "./entities/draw-door";
import { drawPillar } from "./entities/draw-pillar";
import { drawPlayableEntityIcon } from "./entities/draw-playable-entity-icon";
import { drawTrap } from "./entities/draw-trap";
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
  playableEntities: PlayableEntity[];
};

type DrawFn = (_: EntityDrawerParams) => void;

export const drawEntity = ({
  context,
  config,
  subject,
  playableEntities,
}: Params) => {
  if (subject.entity.type === TileEntityTypePlayableEntity.PLAYABLE_ENTITY) {
    const subjectId = subject.entity.id;
    const playableEntity = playableEntities.find(
      (playableEntity) => playableEntity.id === subjectId,
    );
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
  "interactive-entity": {
    door: drawDoor,
    trap: drawTrap,
    chest: drawChest,
  },
  "non-interactive-entity": {
    "off-map": dummyDrawer,
    pillar: drawPillar,
    tree: dummyDrawer,
    wall: drawWall,
  },
} as const;
