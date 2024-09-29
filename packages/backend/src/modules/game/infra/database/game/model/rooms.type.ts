import { Coord } from "@dnd/shared";

export type Room = {
  id: string;
  hasBeenVisited: boolean;
  boundingBoxes: Array<{ topLeft: Coord; bottomRight: Coord }>;
};
