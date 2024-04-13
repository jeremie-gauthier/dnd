import type { LayerDrawerParams } from "./layer-drawer-params.interface";

export function drawMovePreview({
  context,
  config,
  subject,
}: LayerDrawerParams<{
  readonly move_layer: string;
}>) {
  context.drawImage(
    config.assets.move_layer,
    subject.coordIsometric.column,
    subject.coordIsometric.row,
  );
}
