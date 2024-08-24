import type { EntityDrawerParams } from "./entity-drawer-params.interface";

type RequiredAssets = {
  readonly chest_opened: string;
  readonly chest_closed: string;
};

export function drawChest({
  context,
  config,
  subject,
}: EntityDrawerParams<RequiredAssets>) {
  if (subject.entity.type !== "interactive-entity") return;

  const isActive = subject.entity.canInteract;
  const chestAsset = isActive
    ? config.assets.chest_closed
    : config.assets.chest_opened;

  context.drawImage(
    chestAsset,
    subject.coordIsometric.column,
    subject.coordIsometric.row,
  );
}
