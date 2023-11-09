export type Map = {
  width: number;
  height: number;
  entities: Array<{
    coord: { x: number; y: number };
    type: "tree" | "wall";
    isBlocking: boolean;
  }>;
};

const MOCK_MAP: Map = {
  width: 11,
  height: 11,
  entities: [
    {
      coord: { x: 1, y: 1 },
      type: "tree",
      isBlocking: true,
    },
    {
      coord: { x: 5, y: 5 },
      type: "wall",
      isBlocking: true,
    },
    {
      coord: { x: 5, y: 6 },
      type: "wall",
      isBlocking: true,
    },
    {
      coord: { x: 6, y: 5 },
      type: "wall",
      isBlocking: true,
    },
  ],
};

export const useMap = async (): Promise<Map> => {
  return Promise.resolve(MOCK_MAP);
};
