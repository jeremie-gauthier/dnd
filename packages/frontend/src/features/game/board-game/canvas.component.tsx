import { type CanvasHTMLAttributes, forwardRef } from "react";

type Props = CanvasHTMLAttributes<HTMLCanvasElement> & {
  height: number;
  width: number;
};

export const Canvas = forwardRef<HTMLCanvasElement, Props>(
  ({ height, width, ...rest }, ref) => {
    return (
      <canvas
        ref={ref}
        height={height}
        width={width}
        style={{ height, width }}
        {...rest}
      />
    );
  },
);
