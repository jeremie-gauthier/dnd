import { idleRenderer } from "./idle-renderer";
import { preparationRenderer } from "./preparation-renderer";
import type { RendererParams } from "./renderer-params.interface";

export type Strategy = "preparation" | "idle";

export function getRenderer(strategy: Strategy) {
  return strategyToRendererMap[strategy];
}

const strategyToRendererMap: Readonly<
  Record<Strategy, (_: RendererParams) => void>
> = {
  idle: idleRenderer,
  preparation: preparationRenderer,
};
