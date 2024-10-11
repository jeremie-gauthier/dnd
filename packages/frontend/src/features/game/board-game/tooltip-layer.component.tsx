import { SVGAttributes, forwardRef } from "react";

type Props = SVGAttributes<SVGSVGElement> & {
  height: number;
  width: number;
};

export const TooltipLayer = forwardRef<SVGSVGElement, Props>(
  ({ height, width, ...rest }, ref) => {
    return <svg ref={ref} height={height} width={width} {...rest} />;
  },
);
