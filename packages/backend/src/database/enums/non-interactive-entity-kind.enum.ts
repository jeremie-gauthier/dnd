export const NonInteractiveEntityKind = {
  WALL: "wall",
  PILLAR: "pillar",
  TREE: "tree",
  OFF_MAP: "off_map",
} as const;

export const NonInteractiveEntityKindValues = Object.values(
  NonInteractiveEntityKind,
);

export type NonInteractiveEntityKindType =
  (typeof NonInteractiveEntityKind)[keyof typeof NonInteractiveEntityKind];
