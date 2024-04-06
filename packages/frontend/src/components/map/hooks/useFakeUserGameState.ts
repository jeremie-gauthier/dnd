import type { GameEntity, PlayerGameState } from "@dnd/shared";

const MOCK_MAP: GameEntity["map"] = {
  width: 5,
  height: 10,
  tiles: [
    {
      coord: {
        row: 0,
        column: 0,
      },
      entities: [
        {
          type: "playable-entity",
          id: "4d66d84f-bc8d-40b1-9799-7b8c73df00f7",
        },
      ],
      isStartingTile: true,
    },
    {
      coord: {
        row: 0,
        column: 1,
      },
      entities: [
        {
          type: "playable-entity",
          id: "b03ecb32-82b1-4d40-9b7d-db7ae9030388",
        },
      ],
      isStartingTile: true,
    },
    {
      coord: {
        row: 0,
        column: 2,
      },
      entities: [
        {
          type: "playable-entity",
          id: "acdf39ff-95ad-4370-b640-178eafc9e1a0",
        },
      ],
      isStartingTile: true,
    },
    {
      coord: {
        row: 0,
        column: 3,
      },
      entities: [
        {
          type: "playable-entity",
          id: "f95b77cc-d934-4e82-aa7d-373493db4a43",
        },
      ],
      isStartingTile: true,
    },
    {
      coord: {
        row: 0,
        column: 4,
      },
      entities: [],
      isStartingTile: true,
    },
    {
      coord: {
        row: 1,
        column: 0,
      },
      entities: [],
    },
    {
      coord: {
        row: 1,
        column: 1,
      },
      entities: [],
    },
    {
      coord: {
        row: 1,
        column: 2,
      },
      entities: [],
    },
    {
      coord: {
        row: 1,
        column: 3,
      },
      entities: [],
    },
    {
      coord: {
        row: 1,
        column: 4,
      },
      entities: [],
    },
    {
      coord: {
        row: 2,
        column: 0,
      },
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
      coord: {
        row: 2,
        column: 1,
      },
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
      coord: {
        row: 2,
        column: 2,
      },
      entities: [
        {
          type: "non-playable-interactive-entity",
          kind: "door",
          canInteract: true,
          isBlocking: true,
          isVisible: true,
        },
      ],
    },
    {
      coord: {
        row: 2,
        column: 3,
      },
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
      coord: {
        row: 2,
        column: 4,
      },
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
      coord: {
        row: 3,
        column: 0,
      },
      entities: [],
    },
    {
      coord: {
        row: 3,
        column: 1,
      },
      entities: [],
    },
    {
      coord: {
        row: 3,
        column: 2,
      },
      entities: [],
    },
    {
      coord: {
        row: 3,
        column: 3,
      },
      entities: [],
    },
    {
      coord: {
        row: 3,
        column: 4,
      },
      entities: [],
    },
    {
      coord: {
        row: 4,
        column: 0,
      },
      entities: [],
    },
    {
      coord: {
        row: 4,
        column: 1,
      },
      entities: [],
    },
    {
      coord: {
        row: 4,
        column: 2,
      },
      entities: [],
    },
    {
      coord: {
        row: 4,
        column: 3,
      },
      entities: [],
    },
    {
      coord: {
        row: 4,
        column: 4,
      },
      entities: [
        {
          type: "non-playable-non-interactive-entity",
          kind: "pillar",
          isVisible: true,
          isBlocking: true,
          canInteract: false,
        },
      ],
    },
    {
      coord: {
        row: 5,
        column: 0,
      },
      entities: [],
    },
    {
      coord: {
        row: 5,
        column: 1,
      },
      entities: [],
    },
    {
      coord: {
        row: 5,
        column: 2,
      },
      entities: [],
    },
    {
      coord: {
        row: 5,
        column: 3,
      },
      entities: [],
    },
    {
      coord: {
        row: 5,
        column: 4,
      },
      entities: [],
    },
    {
      coord: {
        row: 6,
        column: 0,
      },
      entities: [],
    },
    {
      coord: {
        row: 6,
        column: 1,
      },
      entities: [],
    },
    {
      coord: {
        row: 6,
        column: 2,
      },
      entities: [],
    },
    {
      coord: {
        row: 6,
        column: 3,
      },
      entities: [],
    },
    {
      coord: {
        row: 6,
        column: 4,
      },
      entities: [],
    },
    {
      coord: {
        row: 7,
        column: 0,
      },
      entities: [],
    },
    {
      coord: {
        row: 7,
        column: 1,
      },
      entities: [],
    },
    {
      coord: {
        row: 7,
        column: 2,
      },
      entities: [],
    },
    {
      coord: {
        row: 7,
        column: 3,
      },
      entities: [],
    },
    {
      coord: {
        row: 7,
        column: 4,
      },
      entities: [],
    },
    {
      coord: {
        row: 8,
        column: 0,
      },
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
      coord: {
        row: 8,
        column: 1,
      },
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
      coord: {
        row: 8,
        column: 2,
      },
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
      coord: {
        row: 8,
        column: 3,
      },
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
      coord: {
        row: 8,
        column: 4,
      },
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
      coord: {
        row: 9,
        column: 0,
      },
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
      coord: {
        row: 9,
        column: 1,
      },
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
      coord: {
        row: 9,
        column: 2,
      },
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
      coord: {
        row: 9,
        column: 3,
      },
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
      coord: {
        row: 9,
        column: 4,
      },
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

const MOCK_PLAYABLE_ENTITIES: GameEntity["playableEntities"] = {
  "4d66d84f-bc8d-40b1-9799-7b8c73df00f7": {
    id: "4d66d84f-bc8d-40b1-9799-7b8c73df00f7",
    playedByUserId: "oauth2|discord|282196886662807553	",
    type: "hero",
    currentPhase: "preparation",
    name: "Regdar",
    class: "WARRIOR",
    level: 1,
    initiative: Number.NaN,
    coord: {
      row: 0,
      column: 0,
    },
    isBlocking: true,
    baseHealthPoints: 8,
    healthPoints: 8,
    baseManaPoints: 0,
    manaPoints: 0,
    baseArmorClass: 2,
    armorClass: 2,
    baseMovementPoints: 4,
    movementPoints: 4,
    baseActionPoints: 1,
    actionPoints: 1,
  },
  "b03ecb32-82b1-4d40-9b7d-db7ae9030388": {
    id: "b03ecb32-82b1-4d40-9b7d-db7ae9030388",
    playedByUserId: "oauth2|discord|282196886662807553	",
    type: "hero",
    currentPhase: "preparation",
    name: "Lidda",
    class: "THIEF",
    level: 1,
    initiative: Number.NaN,
    coord: {
      row: 0,
      column: 1,
    },
    isBlocking: true,
    baseHealthPoints: 5,
    healthPoints: 5,
    baseManaPoints: 0,
    manaPoints: 0,
    baseArmorClass: 2,
    armorClass: 2,
    baseMovementPoints: 6,
    movementPoints: 6,
    baseActionPoints: 1,
    actionPoints: 1,
  },
  "acdf39ff-95ad-4370-b640-178eafc9e1a0": {
    id: "acdf39ff-95ad-4370-b640-178eafc9e1a0",
    playedByUserId: "oauth2|discord|282196886662807553	",
    type: "hero",
    currentPhase: "preparation",
    name: "Mialyë",
    class: "SORCERER",
    level: 1,
    initiative: Number.NaN,
    coord: {
      row: 0,
      column: 2,
    },
    isBlocking: true,
    baseHealthPoints: 5,
    healthPoints: 5,
    baseManaPoints: 5,
    manaPoints: 5,
    baseArmorClass: 2,
    armorClass: 2,
    baseMovementPoints: 5,
    movementPoints: 5,
    baseActionPoints: 1,
    actionPoints: 1,
  },
  "f95b77cc-d934-4e82-aa7d-373493db4a43": {
    id: "f95b77cc-d934-4e82-aa7d-373493db4a43",
    playedByUserId: "oauth2|discord|282196886662807553	",
    type: "hero",
    currentPhase: "preparation",
    name: "Jozan",
    class: "CLERIC",
    level: 1,
    initiative: Number.NaN,
    coord: {
      row: 0,
      column: 3,
    },
    isBlocking: true,
    baseHealthPoints: 5,
    healthPoints: 5,
    baseManaPoints: 5,
    manaPoints: 5,
    baseArmorClass: 2,
    armorClass: 2,
    baseMovementPoints: 5,
    movementPoints: 5,
    baseActionPoints: 1,
    actionPoints: 1,
  },
};

export const useFakeUserGameState = (): PlayerGameState => {
  return {
    game: {
      id: "fake-game-id",
      map: MOCK_MAP,
      playableEntities: MOCK_PLAYABLE_ENTITIES,
      status: "prepare_for_battle",
      timeline: [],
    },
    playerPhase: "preparation",
  };
};
