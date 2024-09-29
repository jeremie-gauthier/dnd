import type { LayerDrawerParams } from "./layer-drawer-params.interface";

export function drawEntityTurnHighlight({
  context,
  config,
  subject,
}: LayerDrawerParams<{
  readonly player_turn_layer: string;
}>) {
  context.drawImage(
    config.assets.player_turn_layer,
    subject.coordIsometric.column,
    subject.coordIsometric.row,
  );
}
