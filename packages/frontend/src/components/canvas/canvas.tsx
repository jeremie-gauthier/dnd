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
        // can be multiplied for better resolution
        // height={height * 2}
        // width={width * 2}
        style={{ height, width }}
        {...rest}
      />
    );
  },
);
