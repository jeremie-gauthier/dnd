export interface GameTemplateJson {
  campaignId: string;
  order: number;
  board: {
    height: number;
    width: number;
    startingPositions: Array<{ row: number; column: number }>;
    entities: Array<{ row: number; column: number; kind: string }>;
    events: Array<{
      name: string;
      doorCoord: { row: number; column: number };
      action: string;
      monsters: Array<string>;
      startingRooms: Array<string>;
    }>;
    rooms: Array<{
      id: string;
      hasBeenVisited: boolean;
      boundingBoxes: Array<{
        topLeft: { row: number; column: number };
        bottomRight: { row: number; column: number };
      }>;
    }>;
    winConditions: Array<{ name: string; nbMonstersRemaining: number }>;
  };
}
