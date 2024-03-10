import { TileEntity } from "@dnd/shared";
import { RefObject } from "react";
import { drawDoor } from "./entities/draw-door";
import { drawOffMap } from "./entities/draw-off-map";
import { drawPillar } from "./entities/draw-pillar";
import { drawPlayableEntity } from "./entities/draw-playable-entity";
import { drawTrap } from "./entities/draw-trap";
import { drawTree } from "./entities/draw-tree";
import { drawWall } from "./entities/draw-wall";
import { EntityDrawerParams } from "./entities/entity-drawer-params.interface";

export const useSelectEntityRenderer = (
  canvasRef: RefObject<HTMLCanvasElement>,
) => {
  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");

  const getRenderer = (entity: TileEntity) => {
    if (!canvas || !context) return;

    const entityIdentifier: EntityIdentifier =
      (entity as Extract<TileEntity, { kind: string }>).kind ?? entity.type;
    const renderer = ENTITY_KIND_RENDERER_MAP[entityIdentifier];

    return renderer;
  };

  return { getRenderer };
};

type EntityIdentifier =
  | Extract<TileEntity, { kind: string }>["kind"]
  | Exclude<TileEntity, { kind: string }>["type"];

const ENTITY_KIND_RENDERER_MAP: Readonly<
  Record<EntityIdentifier, (_: EntityDrawerParams) => void>
> = {
  door: drawDoor,
  "off-map": drawOffMap,
  pillar: drawPillar,
  "playable-entity": drawPlayableEntity,
  trap: drawTrap,
  tree: drawTree,
  wall: drawWall,
};
