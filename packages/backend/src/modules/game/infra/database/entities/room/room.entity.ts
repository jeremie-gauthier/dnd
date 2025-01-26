import { BoundingBox } from "./bounding-box.entity";

export class Room {
  id: string;
  hasBeenVisited: boolean;
  boundingBoxes: Array<BoundingBox>;
}
