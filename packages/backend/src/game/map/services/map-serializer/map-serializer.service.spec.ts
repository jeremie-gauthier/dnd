import type { GameEntity, MapCompiledJson } from "@dnd/shared";
import { InternalServerErrorException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { CoordService } from "../coord/coord.service";
import { MapService } from "../map/map.service";
import { MapSerializerService } from "./map-serializer.service";

describe("MapSerializerService", () => {
  let service: MapSerializerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapSerializerService, MapService, CoordService],
    }).compile();

    service = module.get(MapSerializerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("deserialize", () => {
    describe("Happy path", () => {
      describe("1x2 map", () => {
        it("should parse a wall", () => {
          const compiledMap: MapCompiledJson = {
            height: 1,
            width: 2,
            startingPositions: [{ row: 0, column: 1 }],
            entities: [{ row: 0, column: 0, kind: "wall" }],
          };
          const expected: GameEntity["map"] = {
            height: 1,
            width: 2,
            tiles: [
              {
                coord: { row: 0, column: 0 },
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
                coord: { row: 0, column: 1 },
                entities: [],
                isStartingTile: true,
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it("should parse a tree", () => {
          const compiledMap: MapCompiledJson = {
            height: 1,
            width: 2,
            startingPositions: [{ row: 0, column: 1 }],
            entities: [{ row: 0, column: 0, kind: "tree" }],
          };
          const expected: GameEntity["map"] = {
            height: 1,
            width: 2,
            tiles: [
              {
                coord: { row: 0, column: 0 },
                entities: [
                  {
                    type: "non-playable-non-interactive-entity",
                    kind: "tree",
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { row: 0, column: 1 },
                entities: [],
                isStartingTile: true,
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it("should parse a pillar", () => {
          const compiledMap: MapCompiledJson = {
            height: 1,
            width: 2,
            startingPositions: [{ row: 0, column: 1 }],
            entities: [{ row: 0, column: 0, kind: "pillar" }],
          };
          const expected: GameEntity["map"] = {
            height: 1,
            width: 2,
            tiles: [
              {
                coord: { row: 0, column: 0 },
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
                coord: { row: 0, column: 1 },
                entities: [],
                isStartingTile: true,
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it("should parse an empty tile", () => {
          const compiledMap: MapCompiledJson = {
            height: 1,
            width: 2,
            startingPositions: [{ row: 0, column: 1 }],
            entities: [],
          };
          const expected: GameEntity["map"] = {
            height: 1,
            width: 2,
            tiles: [
              {
                coord: { row: 0, column: 0 },
                entities: [],
              },
              {
                coord: { row: 0, column: 1 },
                entities: [],
                isStartingTile: true,
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it("should parse a door", () => {
          const compiledMap: MapCompiledJson = {
            height: 1,
            width: 2,
            startingPositions: [{ row: 0, column: 1 }],
            entities: [{ row: 0, column: 0, kind: "door" }],
          };
          const expected: GameEntity["map"] = {
            height: 1,
            width: 2,
            tiles: [
              {
                coord: { row: 0, column: 0 },
                entities: [
                  {
                    type: "non-playable-interactive-entity",
                    kind: "door",
                    isVisible: true,
                    isBlocking: true,
                    canInteract: true,
                  },
                ],
              },
              {
                coord: { row: 0, column: 1 },
                entities: [],
                isStartingTile: true,
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it("should parse a trap", () => {
          const compiledMap: MapCompiledJson = {
            height: 1,
            width: 2,
            startingPositions: [{ row: 0, column: 1 }],
            entities: [{ row: 0, column: 0, kind: "trap" }],
          };
          const expected: GameEntity["map"] = {
            height: 1,
            width: 2,
            tiles: [
              {
                coord: { row: 0, column: 0 },
                entities: [
                  {
                    type: "non-playable-interactive-entity",
                    kind: "trap",
                    isVisible: false,
                    isBlocking: false,
                    canInteract: true,
                    name: "pit",
                  },
                ],
              },
              {
                coord: { row: 0, column: 1 },
                entities: [],
                isStartingTile: true,
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });
      });

      describe("3x2 map", () => {
        it("should parse pillar in the top right corner of the map", () => {
          const compiledMap: MapCompiledJson = {
            height: 3,
            width: 2,
            startingPositions: [{ row: 0, column: 0 }],
            entities: [{ row: 0, column: 1, kind: "pillar" }],
          };
          const expected: GameEntity["map"] = {
            height: 3,
            width: 2,
            tiles: [
              {
                coord: { row: 0, column: 0 },
                entities: [],
                isStartingTile: true,
              },
              {
                coord: { row: 0, column: 1 },
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
                coord: { row: 1, column: 0 },
                entities: [],
              },
              {
                coord: { row: 1, column: 1 },
                entities: [],
              },
              {
                coord: { row: 2, column: 0 },
                entities: [],
              },
              {
                coord: { row: 2, column: 1 },
                entities: [],
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it("should parse a wall on the top and bot lines", () => {
          const compiledMap: MapCompiledJson = {
            height: 3,
            width: 2,
            startingPositions: [{ row: 1, column: 1 }],
            entities: [
              { row: 0, column: 0, kind: "wall" },
              { row: 0, column: 1, kind: "wall" },
              { row: 2, column: 0, kind: "wall" },
              { row: 2, column: 1, kind: "wall" },
            ],
          };
          const expected: GameEntity["map"] = {
            height: 3,
            width: 2,
            tiles: [
              {
                coord: { row: 0, column: 0 },
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
                coord: { row: 0, column: 1 },
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
                coord: { row: 1, column: 0 },
                entities: [],
              },
              {
                coord: { row: 1, column: 1 },
                entities: [],
                isStartingTile: true,
              },
              {
                coord: { row: 2, column: 0 },
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
                coord: { row: 2, column: 1 },
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
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it("should parse an empty map", () => {
          const compiledMap: MapCompiledJson = {
            height: 3,
            width: 2,
            startingPositions: [{ row: 0, column: 0 }],
            entities: [],
          };
          const expected: GameEntity["map"] = {
            height: 3,
            width: 2,
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
                coord: { row: 1, column: 0 },
                entities: [],
              },
              {
                coord: { row: 1, column: 1 },
                entities: [],
              },
              {
                coord: { row: 2, column: 0 },
                entities: [],
              },
              {
                coord: { row: 2, column: 1 },
                entities: [],
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it("should parse a door vertically surrounded by walls in the middle of the map", () => {
          const compiledMap: MapCompiledJson = {
            height: 3,
            width: 2,
            startingPositions: [{ row: 0, column: 0 }],
            entities: [
              { row: 0, column: 1, kind: "wall" },
              { row: 1, column: 1, kind: "door" },
              { row: 2, column: 1, kind: "wall" },
            ],
          };
          const expected: GameEntity["map"] = {
            height: 3,
            width: 2,
            tiles: [
              {
                coord: { row: 0, column: 0 },
                entities: [],
                isStartingTile: true,
              },
              {
                coord: { row: 0, column: 1 },
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
                coord: { row: 1, column: 0 },
                entities: [],
              },
              {
                coord: { row: 1, column: 1 },
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
                coord: { row: 2, column: 0 },
                entities: [],
              },
              {
                coord: { row: 2, column: 1 },
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
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });
      });

      describe("5x5 map", () => {
        it("should parse an empty map", () => {
          const compiledMap: MapCompiledJson = {
            height: 5,
            width: 5,
            startingPositions: [{ row: 0, column: 0 }],
            entities: [],
          };
          const expected: GameEntity["map"] = {
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
                entities: [],
              },
              {
                coord: { row: 1, column: 1 },
                entities: [],
              },
              {
                coord: { row: 1, column: 2 },
                entities: [],
              },
              {
                coord: { row: 1, column: 3 },
                entities: [],
              },
              {
                coord: { row: 1, column: 4 },
                entities: [],
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
                entities: [],
              },
              {
                coord: { row: 3, column: 1 },
                entities: [],
              },
              {
                coord: { row: 3, column: 2 },
                entities: [],
              },
              {
                coord: { row: 3, column: 3 },
                entities: [],
              },
              {
                coord: { row: 3, column: 4 },
                entities: [],
              },
              {
                coord: { row: 4, column: 0 },
                entities: [],
              },
              {
                coord: { row: 4, column: 1 },
                entities: [],
              },
              {
                coord: { row: 4, column: 2 },
                entities: [],
              },
              {
                coord: { row: 4, column: 3 },
                entities: [],
              },
              {
                coord: { row: 4, column: 4 },
                entities: [],
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it("should parse a map with an off-map section", () => {
          const compiledMap: MapCompiledJson = {
            height: 5,
            width: 5,
            startingPositions: [{ row: 0, column: 0 }],
            entities: [
              { row: 1, column: 0, kind: "wall" },
              { row: 1, column: 1, kind: "wall" },
              { row: 1, column: 2, kind: "door" },
              { row: 1, column: 3, kind: "wall" },
              { row: 1, column: 4, kind: "wall" },
              { row: 3, column: 0, kind: "wall" },
              { row: 3, column: 1, kind: "wall" },
              { row: 3, column: 2, kind: "wall" },
              { row: 3, column: 3, kind: "wall" },
              { row: 3, column: 4, kind: "wall" },
            ],
          };
          const expected: GameEntity["map"] = {
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

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });
      });
    });

    describe("Negative path", () => {
      it("should throw an InternalServerErrorException if the map has no starting-tile", () => {
        const compiledMap: MapCompiledJson = {
          height: 1,
          width: 1,
          startingPositions: [],
          entities: [],
        };

        expect(() => service.deserialize(compiledMap)).toThrowError(
          InternalServerErrorException,
        );
      });

      it("should throw an InternalServerErrorException if the map contains unrecognized entities", () => {
        const compiledMap = {
          height: 1,
          width: 2,
          startingPositions: [{ row: 0, column: 0 }],
          entities: [{ row: 0, column: 1, kind: "banana" }],
        } as unknown as MapCompiledJson;

        expect(() => service.deserialize(compiledMap)).toThrowError(
          InternalServerErrorException,
        );
      });

      it("should throw an InternalServerErrorException if the map contains invalid metadata", () => {
        expect(() =>
          service.deserialize({
            height: -1,
            width: 2,
            startingPositions: [],
            entities: [],
          }),
        ).toThrowError(InternalServerErrorException);
        expect(() =>
          service.deserialize({
            height: 0,
            width: 2,
            startingPositions: [],
            entities: [],
          }),
        ).toThrowError(InternalServerErrorException);
        expect(() => service.deserialize({
          height: 2,
          width: 0,
          startingPositions: [],
          entities: [],
        })).toThrowError(
          InternalServerErrorException,
        );
        expect(() => service.deserialize({
          height: 1,
          width: -2,
          startingPositions: [],
          entities: [],
        })).toThrowError(
          InternalServerErrorException,
        );
        expect(() => service.deserialize({
          height: 'banana',
          width: 2,
          startingPositions: [],
          entities: [],
        } as unknown as MapCompiledJson)).toThrowError(
          InternalServerErrorException,
        );
        expect(() => service.deserialize({
          height: 1,
          width: 'banana',
          startingPositions: [],
          entities: [],
        } as unknown as MapCompiledJson)).toThrowError(
          InternalServerErrorException,
        );
        expect(() => service.deserialize({
          height: 'apple',
          width: 'banana',
          startingPositions: [],
          entities: [],
        } as unknown as MapCompiledJson)).toThrowError(
          InternalServerErrorException,
        );
      });

      it("should throw an InternalServerErrorException if the map declare an entity out of range", () => {
        const compiledMap: MapCompiledJson = {
          height: 1,
          width: 2,
          startingPositions: [{ row: 0, column: 0 }],
          entities: [{ row: 0, column: 42, kind: "door" }],
        };

        expect(() => service.deserialize(compiledMap)).toThrowError(
          InternalServerErrorException,
        );
      });
    });
  });
});
