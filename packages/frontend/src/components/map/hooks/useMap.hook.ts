import type { GameEntity } from "@dnd/shared";

const MOCK_MAP: GameEntity["map"] = {
  height: 5,
  width: 5,
  tiles: [
    {
      coord: { row: 0, column: 0 },
      entities: [],
      isStartingTile: true,
    },
    {
      coord: { row: 0, column: 1 },
      entities: [],
    },
    {
      coord: { row: 0, column: 2 },
      entities: [],
    },
    {
      coord: { row: 0, column: 3 },
      entities: [],
    },
    {
      coord: { row: 0, column: 4 },
      entities: [],
    },
    {
      coord: { row: 1, column: 0 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "wall",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: { row: 1, column: 1 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "wall",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: { row: 1, column: 2 },
      entities: [
        {
          type: "non-playable-interactive-entity",
          canInteract: true,
          isBlocking: true,
          isVisible: true,
          kind: "door",
        },
      ],
    },
    {
      coord: { row: 1, column: 3 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "wall",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: { row: 1, column: 4 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "wall",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: { row: 2, column: 0 },
      entities: [],
    },
    {
      coord: { row: 2, column: 1 },
      entities: [],
    },
    {
      coord: { row: 2, column: 2 },
      entities: [],
    },
    {
      coord: { row: 2, column: 3 },
      entities: [],
    },
    {
      coord: { row: 2, column: 4 },
      entities: [],
    },
    {
      coord: { row: 3, column: 0 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "wall",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: { row: 3, column: 1 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "wall",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: { row: 3, column: 2 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "wall",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: { row: 3, column: 3 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "wall",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: { row: 3, column: 4 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "wall",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: { row: 4, column: 0 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "off-map",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: { row: 4, column: 1 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "off-map",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: { row: 4, column: 2 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "off-map",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: { row: 4, column: 3 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "off-map",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: { row: 4, column: 4 },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "off-map",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
  ],
};

export const useMap = (): GameEntity["map"] => {
  return MOCK_MAP;
};
