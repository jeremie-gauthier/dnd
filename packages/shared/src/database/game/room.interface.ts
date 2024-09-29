import { Coord } from "./coord.interface";

export interface Room {
  id: string;
  hasBeenVisited: boolean;
  boundingBoxes: Array<{
    topLeft: Coord;
    bottomRight: Coord;
  }>;
}
