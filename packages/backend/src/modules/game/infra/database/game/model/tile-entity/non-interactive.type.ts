export type TileNonInteractiveEntity = {
  type: "non-interactive-entity";
  kind: "wall" | "pillar" | "tree" | "off-map";
  isVisible: true;
  isBlocking: true;
  canInteract: false;
};
