import { PlayerGamePhase } from "@dnd/shared";
import { actionRenderer } from "./action-renderer";
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
  action: actionRenderer,
  idle: idleRenderer,
  preparation: preparationRenderer,
};
