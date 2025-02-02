import { TileEntityType } from "@/openapi/dnd-api";
import type { EntityDrawerParams } from "./entity-drawer-params.interface";

type RequiredAssets = {
  readonly trap_active: string;
  readonly trap_inactive: string;
};

export function drawTrap({
  context,
  config,
  subject,
}: EntityDrawerParams<RequiredAssets>) {
  if (subject.entity.type !== TileEntityType.INTERACTIVE_ENTITY) return;

  const isActive = subject.entity.canInteract;
  const trapAsset = isActive
    ? config.assets.trap_active
    : config.assets.trap_inactive;

  context.drawImage(
    trapAsset,
    subject.coordIsometric.column,
    subject.coordIsometric.row,
  );
}
