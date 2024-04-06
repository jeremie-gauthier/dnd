import { PlayerGamePhase } from "@dnd/shared";
import { idleRenderer } from "./idle-renderer";
import { preparationRenderer } from "./preparation-renderer";
import type { RendererParams } from "./renderer-params.interface";

export type Strategy = "preparation" | "idle";

export function getRenderer(strategy: PlayerGamePhase) {
  return strategyToRendererMap[strategy];
}

const strategyToRendererMap: Readonly<
  Record<PlayerGamePhase, (_: RendererParams) => void>
> = {
  action: () => undefined,
  idle: idleRenderer,
  preparation: preparationRenderer,
};
