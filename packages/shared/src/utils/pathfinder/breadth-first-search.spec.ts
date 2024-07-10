import { describe, expect, it } from "vitest";
import { GameView } from "../../database";
import { getAllPathsFromTileWithinRange } from "./breadth-first-search";

describe("pathfinder: breadth-first-search", () => {
  describe("getAllPathsFromTileWithinRange", () => {
    it("should return the correct TilePaths when the path is blocked by allies", () => {
      const map = {
        width: 5,
        height: 5,
        tiles: [
          {
            coord: {
              row: 0,
              column: 0,
            },
            entities: [],
          },
          {
            coord: {
              row: 0,
              column: 1,
            },
            entities: [],
          },
          {
            coord: {
              row: 0,
              column: 2,
            },
            entities: [],
          },
          {
            coord: {
              row: 0,
              column: 3,
            },
            entities: [],
          },
          {
            coord: {
              row: 0,
              column: 4,
            },
            entities: [],
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
            entities: [],
          },
          {
            coord: {
              row: 2,
              column: 1,
            },
            entities: [],
          },
          {
            coord: {
              row: 2,
              column: 2,
            },
            entities: [
              {
                type: "playable-entity",
                id: "regdar",
              },
            ],
            isStartingTile: true,
          },
          {
            coord: {
              row: 2,
              column: 3,
            },
            entities: [
              {
                type: "playable-entity",
                id: "lidda",
              },
            ],
            isStartingTile: true,
          },
          {
            coord: {
              row: 2,
              column: 4,
            },
            entities: [
              {
                type: "playable-entity",
                id: "mialye",
              },
            ],
            isStartingTile: true,
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
            entities: [
              {
                type: "playable-entity",
                id: "jozan",
              },
            ],
            isStartingTile: true,
          },
          {
            coord: {
              row: 3,
              column: 3,
            },
            entities: [],
            isStartingTile: true,
          },
          {
            coord: {
              row: 3,
              column: 4,
            },
            entities: [],
            isStartingTile: true,
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
            entities: [],
          },
        ],
      } as GameView["map"];
      const originCoord = { row: 2, column: 2 };
      const maxRange = 4;

      const result = getAllPathsFromTileWithinRange({
        game: { map } as GameView,
        originCoord,
        maxRange,
      });

      expect(result).toStrictEqual([
        {
          tile: {
            coord: {
              row: 1,
              column: 2,
            },
            entities: [],
          },
          range: 1,
          fromTile: {
            tile: {
              coord: {
                row: 2,
                column: 2,
              },
              entities: [
                {
                  type: "playable-entity",
                  id: "regdar",
                },
              ],
              isStartingTile: true,
            },
            range: 0,
          },
        },
        {
          tile: {
            coord: {
              row: 2,
              column: 1,
            },
            entities: [],
          },
          range: 1,
          fromTile: {
            tile: {
              coord: {
                row: 2,
                column: 2,
              },
              entities: [
                {
                  type: "playable-entity",
                  id: "regdar",
                },
              ],
              isStartingTile: true,
            },
            range: 0,
          },
        },
        {
          tile: {
            coord: {
              row: 0,
              column: 2,
            },
            entities: [],
          },
          range: 2,
          fromTile: {
            tile: {
              coord: {
                row: 1,
                column: 2,
              },
              entities: [],
            },
            range: 1,
            fromTile: {
              tile: {
                coord: {
                  row: 2,
                  column: 2,
                },
                entities: [
                  {
                    type: "playable-entity",
                    id: "regdar",
                  },
                ],
                isStartingTile: true,
              },
              range: 0,
            },
          },
        },
        {
          tile: {
            coord: {
              row: 1,
              column: 1,
            },
            entities: [],
          },
          range: 2,
          fromTile: {
            tile: {
              coord: {
                row: 1,
                column: 2,
              },
              entities: [],
            },
            range: 1,
            fromTile: {
              tile: {
                coord: {
                  row: 2,
                  column: 2,
                },
                entities: [
                  {
                    type: "playable-entity",
                    id: "regdar",
                  },
                ],
                isStartingTile: true,
              },
              range: 0,
            },
          },
        },
        {
          tile: {
            coord: {
              row: 1,
              column: 3,
            },
            entities: [],
          },
          range: 2,
          fromTile: {
            tile: {
              coord: {
                row: 1,
                column: 2,
              },
              entities: [],
            },
            range: 1,
            fromTile: {
              tile: {
                coord: {
                  row: 2,
                  column: 2,
                },
                entities: [
                  {
                    type: "playable-entity",
                    id: "regdar",
                  },
                ],
                isStartingTile: true,
              },
              range: 0,
            },
          },
        },
        {
          tile: {
            coord: {
              row: 3,
              column: 1,
            },
            entities: [],
          },
          range: 2,
          fromTile: {
            tile: {
              coord: {
                row: 2,
                column: 1,
              },
              entities: [],
            },
            range: 1,
            fromTile: {
              tile: {
                coord: {
                  row: 2,
                  column: 2,
                },
                entities: [
                  {
                    type: "playable-entity",
                    id: "regdar",
                  },
                ],
                isStartingTile: true,
              },
              range: 0,
            },
          },
        },
        {
          tile: {
            coord: {
              row: 2,
              column: 0,
            },
            entities: [],
          },
          range: 2,
          fromTile: {
            tile: {
              coord: {
                row: 2,
                column: 1,
              },
              entities: [],
            },
            range: 1,
            fromTile: {
              tile: {
                coord: {
                  row: 2,
                  column: 2,
                },
                entities: [
                  {
                    type: "playable-entity",
                    id: "regdar",
                  },
                ],
                isStartingTile: true,
              },
              range: 0,
            },
          },
        },
        {
          tile: {
            coord: {
              row: 0,
              column: 1,
            },
            entities: [],
          },
          range: 3,
          fromTile: {
            tile: {
              coord: {
                row: 0,
                column: 2,
              },
              entities: [],
            },
            range: 2,
            fromTile: {
              tile: {
                coord: {
                  row: 1,
                  column: 2,
                },
                entities: [],
              },
              range: 1,
              fromTile: {
                tile: {
                  coord: {
                    row: 2,
                    column: 2,
                  },
                  entities: [
                    {
                      type: "playable-entity",
                      id: "regdar",
                    },
                  ],
                  isStartingTile: true,
                },
                range: 0,
              },
            },
          },
        },
        {
          tile: {
            coord: {
              row: 0,
              column: 3,
            },
            entities: [],
          },
          range: 3,
          fromTile: {
            tile: {
              coord: {
                row: 0,
                column: 2,
              },
              entities: [],
            },
            range: 2,
            fromTile: {
              tile: {
                coord: {
                  row: 1,
                  column: 2,
                },
                entities: [],
              },
              range: 1,
              fromTile: {
                tile: {
                  coord: {
                    row: 2,
                    column: 2,
                  },
                  entities: [
                    {
                      type: "playable-entity",
                      id: "regdar",
                    },
                  ],
                  isStartingTile: true,
                },
                range: 0,
              },
            },
          },
        },
        {
          tile: {
            coord: {
              row: 1,
              column: 0,
            },
            entities: [],
          },
          range: 3,
          fromTile: {
            tile: {
              coord: {
                row: 1,
                column: 1,
              },
              entities: [],
            },
            range: 2,
            fromTile: {
              tile: {
                coord: {
                  row: 1,
                  column: 2,
                },
                entities: [],
              },
              range: 1,
              fromTile: {
                tile: {
                  coord: {
                    row: 2,
                    column: 2,
                  },
                  entities: [
                    {
                      type: "playable-entity",
                      id: "regdar",
                    },
                  ],
                  isStartingTile: true,
                },
                range: 0,
              },
            },
          },
        },
        {
          tile: {
            coord: {
              row: 1,
              column: 4,
            },
            entities: [],
          },
          range: 3,
          fromTile: {
            tile: {
              coord: {
                row: 1,
                column: 3,
              },
              entities: [],
            },
            range: 2,
            fromTile: {
              tile: {
                coord: {
                  row: 1,
                  column: 2,
                },
                entities: [],
              },
              range: 1,
              fromTile: {
                tile: {
                  coord: {
                    row: 2,
                    column: 2,
                  },
                  entities: [
                    {
                      type: "playable-entity",
                      id: "regdar",
                    },
                  ],
                  isStartingTile: true,
                },
                range: 0,
              },
            },
          },
        },
        {
          tile: {
            coord: {
              row: 4,
              column: 1,
            },
            entities: [],
          },
          range: 3,
          fromTile: {
            tile: {
              coord: {
                row: 3,
                column: 1,
              },
              entities: [],
            },
            range: 2,
            fromTile: {
              tile: {
                coord: {
                  row: 2,
                  column: 1,
                },
                entities: [],
              },
              range: 1,
              fromTile: {
                tile: {
                  coord: {
                    row: 2,
                    column: 2,
                  },
                  entities: [
                    {
                      type: "playable-entity",
                      id: "regdar",
                    },
                  ],
                  isStartingTile: true,
                },
                range: 0,
              },
            },
          },
        },
        {
          tile: {
            coord: {
              row: 3,
              column: 0,
            },
            entities: [],
          },
          range: 3,
          fromTile: {
            tile: {
              coord: {
                row: 3,
                column: 1,
              },
              entities: [],
            },
            range: 2,
            fromTile: {
              tile: {
                coord: {
                  row: 2,
                  column: 1,
                },
                entities: [],
              },
              range: 1,
              fromTile: {
                tile: {
                  coord: {
                    row: 2,
                    column: 2,
                  },
                  entities: [
                    {
                      type: "playable-entity",
                      id: "regdar",
                    },
                  ],
                  isStartingTile: true,
                },
                range: 0,
              },
            },
          },
        },
        {
          tile: {
            coord: {
              row: 0,
              column: 0,
            },
            entities: [],
          },
          range: 4,
          fromTile: {
            tile: {
              coord: {
                row: 0,
                column: 1,
              },
              entities: [],
            },
            range: 3,
            fromTile: {
              tile: {
                coord: {
                  row: 0,
                  column: 2,
                },
                entities: [],
              },
              range: 2,
              fromTile: {
                tile: {
                  coord: {
                    row: 1,
                    column: 2,
                  },
                  entities: [],
                },
                range: 1,
                fromTile: {
                  tile: {
                    coord: {
                      row: 2,
                      column: 2,
                    },
                    entities: [
                      {
                        type: "playable-entity",
                        id: "regdar",
                      },
                    ],
                    isStartingTile: true,
                  },
                  range: 0,
                },
              },
            },
          },
        },
        {
          tile: {
            coord: {
              row: 0,
              column: 4,
            },
            entities: [],
          },
          range: 4,
          fromTile: {
            tile: {
              coord: {
                row: 0,
                column: 3,
              },
              entities: [],
            },
            range: 3,
            fromTile: {
              tile: {
                coord: {
                  row: 0,
                  column: 2,
                },
                entities: [],
              },
              range: 2,
              fromTile: {
                tile: {
                  coord: {
                    row: 1,
                    column: 2,
                  },
                  entities: [],
                },
                range: 1,
                fromTile: {
                  tile: {
                    coord: {
                      row: 2,
                      column: 2,
                    },
                    entities: [
                      {
                        type: "playable-entity",
                        id: "regdar",
                      },
                    ],
                    isStartingTile: true,
                  },
                  range: 0,
                },
              },
            },
          },
        },
        {
          tile: {
            coord: {
              row: 4,
              column: 0,
            },
            entities: [],
          },
          range: 4,
          fromTile: {
            tile: {
              coord: {
                row: 4,
                column: 1,
              },
              entities: [],
            },
            range: 3,
            fromTile: {
              tile: {
                coord: {
                  row: 3,
                  column: 1,
                },
                entities: [],
              },
              range: 2,
              fromTile: {
                tile: {
                  coord: {
                    row: 2,
                    column: 1,
                  },
                  entities: [],
                },
                range: 1,
                fromTile: {
                  tile: {
                    coord: {
                      row: 2,
                      column: 2,
                    },
                    entities: [
                      {
                        type: "playable-entity",
                        id: "regdar",
                      },
                    ],
                    isStartingTile: true,
                  },
                  range: 0,
                },
              },
            },
          },
        },
        {
          tile: {
            coord: {
              row: 4,
              column: 2,
            },
            entities: [],
          },
          range: 4,
          fromTile: {
            tile: {
              coord: {
                row: 4,
                column: 1,
              },
              entities: [],
            },
            range: 3,
            fromTile: {
              tile: {
                coord: {
                  row: 3,
                  column: 1,
                },
                entities: [],
              },
              range: 2,
              fromTile: {
                tile: {
                  coord: {
                    row: 2,
                    column: 1,
                  },
                  entities: [],
                },
                range: 1,
                fromTile: {
                  tile: {
                    coord: {
                      row: 2,
                      column: 2,
                    },
                    entities: [
                      {
                        type: "playable-entity",
                        id: "regdar",
                      },
                    ],
                    isStartingTile: true,
                  },
                  range: 0,
                },
              },
            },
          },
        },
      ]);
    });
  });
});
