import type { LayerDrawerParams } from "./layer-drawer-params.interface";

export function drawAttackPreview({
  context,
  config,
  subject,
}: LayerDrawerParams<{
  readonly attack_layer: string;
}>) {
  context.drawImage(
    config.assets.attack_layer,
    subject.coordIsometric.column,
    subject.coordIsometric.row,
  );
}
