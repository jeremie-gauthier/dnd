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
          type: "non-playable-interactive-entity",
          kind: "door",
          isBlocking: true,
          canInteract: true,
          isVisible: true,
        },
      ],
    },
    {
      coord: { row: 5, column: 7 },
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

export const useMap = (): GameEntity["map"] => {
  return MOCK_MAP;
};
