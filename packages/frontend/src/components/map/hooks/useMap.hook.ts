import { GameEntity } from "@dnd/shared";

const MOCK_MAP: GameEntity["map"] = {
  width: 11,
  height: 11,
  tiles: [
    {
      coord: { row: 1, column: 1 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "tree",
          isBlocking: true,
          canInteract: false,
          isVisible: true,
        },
      ],
    },
    {
      coord: { row: 5, column: 5 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "wall",
          isBlocking: true,
          canInteract: false,
          isVisible: true,
        },
      ],
    },
    {
      coord: { row: 5, column: 6 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "wall",
          isBlocking: true,
          canInteract: false,
          isVisible: true,
        },
      ],
    },
    {
      coord: { row: 6, column: 5 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "wall",
          isBlocking: true,
          canInteract: false,
          isVisible: true,
        },
      ],
    },
  ],
};

export const useMap = async (): Promise<GameEntity["map"]> => {
  return Promise.resolve(MOCK_MAP);
};
