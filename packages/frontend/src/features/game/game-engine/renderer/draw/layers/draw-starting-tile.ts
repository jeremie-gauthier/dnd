import type { LayerDrawerParams } from "./layer-drawer-params.interface";

export function drawStartingTile({
  context,
  config,
  subject,
}: LayerDrawerParams<{
  readonly move_layer: string;
}>) {
  if (!subject.tile.isStartingTile) return;

  context.drawImage(
    config.assets.move_layer,
    subject.coordIsometric.column,
    subject.coordIsometric.row,
  );
}
