import { TooltipDrawerParams } from "./tooltip-layer-params.interface";

export function drawMoveForbiddenTooltip({
  context,
  config,
  subject,
}: TooltipDrawerParams) {
  const tooltipSize = 24;

  context.drawImage(
    config.assets.move_forbidden,
    subject.coordIsometric.column + config.assetSize * 0.5 - tooltipSize * 0.5,
    subject.coordIsometric.row + tooltipSize * 0.2,
    tooltipSize,
    tooltipSize,
  );
}
