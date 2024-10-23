import { SVGAttributes, forwardRef } from "react";
import { InteractionsAuthorizedTooltip } from "./interactions-tooltip/interactions-authorized-tooltip.component";
import { useInteractionsTooltip } from "./interactions-tooltip/use-interactions-tooltip";
import { MoveForbiddenTooltip } from "./move-forbidden-tooltip/move-forbidden-tooltip.component";
import { useMoveForbiddenTooltip } from "./move-forbidden-tooltip/use-move-forbidden-tooltip";

type Props = SVGAttributes<SVGSVGElement> & {
  height: number;
  width: number;
};

export const TooltipLayer = forwardRef<SVGSVGElement, Props>(
  ({ height, width, ...rest }, ref) => {
    const { moveForbiddenTooltip } = useMoveForbiddenTooltip();
    const { interactionsAuthorizedTooltip } = useInteractionsTooltip();

    return (
      // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
      <svg height={height} width={width} ref={ref} {...rest}>
        {moveForbiddenTooltip && (
          <MoveForbiddenTooltip {...moveForbiddenTooltip} />
        )}

        {interactionsAuthorizedTooltip && (
          <InteractionsAuthorizedTooltip {...interactionsAuthorizedTooltip} />
        )}
      </svg>
    );
  },
);
