import { GameEntity } from '@dnd/shared';
import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { MapSerializerService } from './map-serializer.service';

describe('MapSerializerService', () => {
  let service: MapSerializerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapSerializerService],
    }).compile();

    service = module.get<MapSerializerService>(MapSerializerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('deserialize', () => {
    describe('Happy path', () => {
      describe('1x2 map', () => {
        it('should parse a wall', () => {
          const compiledMap = `
						1;2
						0,1
						0,0;wall
					`;
          const expected: GameEntity['map'] = {
            width: 1,
            height: 2,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 0, y: 1 },
                entities: [],
                isStartingTile: true,
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it('should parse a tree', () => {
          const compiledMap = `
						1;2
						0,1
						0,0;tree
					`;
          const expected: GameEntity['map'] = {
            width: 1,
            height: 2,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'tree',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 0, y: 1 },
                entities: [],
                isStartingTile: true,
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it('should parse a pillar', () => {
          const compiledMap = `
						1;2
						0,1
						0,0;pillar
					`;
          const expected: GameEntity['map'] = {
            width: 1,
            height: 2,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'pillar',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 0, y: 1 },
                entities: [],
                isStartingTile: true,
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it('should parse an empty tile', () => {
          const compiledMap = `
						1;2
						0,1
					`;
          const expected: GameEntity['map'] = {
            width: 1,
            height: 2,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [],
              },
              {
                coord: { x: 0, y: 1 },
                entities: [],
                isStartingTile: true,
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it('should parse a door', () => {
          const compiledMap = `
						1;2
						0,1
						0,0;door
					`;
          const expected: GameEntity['map'] = {
            width: 1,
            height: 2,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [
                  {
                    type: 'non-playable-interactive-entity',
                    kind: 'door',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: true,
                  },
                ],
              },
              {
                coord: { x: 0, y: 1 },
                entities: [],
                isStartingTile: true,
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it.skip('should parse a trap', () => {
          const compiledMap = `
						1;2
						0,1
						0,0;trap
					`;
          const expected: GameEntity['map'] = {
            width: 1,
            height: 2,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [
                  {
                    type: 'non-playable-interactive-entity',
                    kind: 'trap',
                    isVisible: false,
                    isBlocking: false,
                    canInteract: true,
                  },
                ],
              },
              {
                coord: { x: 0, y: 1 },
                entities: [],
                isStartingTile: true,
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it('should parse a playable entity', () => {
          const playableEntityId = 'f9c7b04f-78c7-4e09-9114-5f6cdfaf18cf';
          const compiledMap = `
						1;2
						0,1
						0,0;playable,${playableEntityId}
					`;
          const expected: GameEntity['map'] = {
            width: 1,
            height: 2,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [
                  {
                    type: 'playable-entity',
                    id: playableEntityId,
                  },
                ],
              },
              {
                coord: { x: 0, y: 1 },
                entities: [],
                isStartingTile: true,
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it('should parse a playable entity that is on a starting tile', () => {
          const playableEntityId = 'f9c7b04f-78c7-4e09-9114-5f6cdfaf18cf';
          const compiledMap = `
						1;2
						0,0
						0,0;playable,${playableEntityId}
					`;
          const expected: GameEntity['map'] = {
            width: 1,
            height: 2,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [
                  {
                    type: 'playable-entity',
                    id: playableEntityId,
                  },
                ],
                isStartingTile: true,
              },
              {
                coord: { x: 0, y: 1 },
                entities: [],
              },
            ],
          };
          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });
      });

      describe('2x3 map', () => {
        it('should parse pillar in the top right corner of the map', () => {
          const compiledMap = `
						2;3
						0,0
						0,1;pillar
					`;
          const expected: GameEntity['map'] = {
            width: 2,
            height: 3,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [],
              },
              {
                coord: { x: 1, y: 0 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'pillar',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 0, y: 1 },
                entities: [],
              },
              {
                coord: { x: 1, y: 1 },
                entities: [],
              },
              {
                coord: { x: 0, y: 2 },
                entities: [],
              },
              {
                coord: { x: 1, y: 2 },
                entities: [],
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it('should parse a wall on the top and bot lines', () => {
          const compiledMap = `
						2;3
						1,1
						0,0;wall
						0,1;wall
						0,2;wall
						1,2;wall
					`;
          const expected: GameEntity['map'] = {
            width: 2,
            height: 3,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 1, y: 0 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 0, y: 1 },

                entities: [],
              },
              {
                coord: { x: 1, y: 1 },

                entities: [],
              },
              {
                coord: { x: 0, y: 2 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 1, y: 2 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
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

        it('should parse an empty map', () => {
          const compiledMap = `
						2;3
						0,0
					`;
          const expected: GameEntity['map'] = {
            width: 2,
            height: 3,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [],
                isStartingTile: true,
              },
              {
                coord: { x: 1, y: 0 },
                entities: [],
              },
              {
                coord: { x: 0, y: 1 },
                entities: [],
              },
              {
                coord: { x: 1, y: 1 },
                entities: [],
              },
              {
                coord: { x: 0, y: 2 },
                entities: [],
              },
              {
                coord: { x: 1, y: 2 },
                entities: [],
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it('should parse a door vertically surrounded by walls in the middle of the map', () => {
          const compiledMap = `
						2;3
						0,0
						1,0;wall
						1,1;door
						1,2;wall
					`;
          const expected: GameEntity['map'] = {
            width: 2,
            height: 3,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [],
                isStartingTile: true,
              },
              {
                coord: { x: 1, y: 0 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 0, y: 1 },
                entities: [],
              },
              {
                coord: { x: 1, y: 1 },
                entities: [
                  {
                    type: 'non-playable-interactive-entity',
                    kind: 'door',
                    canInteract: true,
                    isBlocking: true,
                    isVisible: true,
                  },
                ],
              },
              {
                coord: { x: 0, y: 2 },

                entities: [],
              },
              {
                coord: { x: 1, y: 2 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
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

      describe('5x5 map', () => {
        it('should parse an empty map', () => {
          const compiledMap = `
						5;5
						0,0
					`;
          const expected: GameEntity['map'] = {
            height: 5,
            width: 5,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [],
                isStartingTile: true,
              },
              {
                coord: { x: 1, y: 0 },
                entities: [],
              },
              {
                coord: { x: 2, y: 0 },
                entities: [],
              },
              {
                coord: { x: 3, y: 0 },
                entities: [],
              },
              {
                coord: { x: 4, y: 0 },
                entities: [],
              },
              {
                coord: { x: 0, y: 1 },
                entities: [],
              },
              {
                coord: { x: 1, y: 1 },
                entities: [],
              },
              {
                coord: { x: 2, y: 1 },
                entities: [],
              },
              {
                coord: { x: 3, y: 1 },
                entities: [],
              },
              {
                coord: { x: 4, y: 1 },
                entities: [],
              },
              {
                coord: { x: 0, y: 2 },
                entities: [],
              },
              {
                coord: { x: 1, y: 2 },
                entities: [],
              },
              {
                coord: { x: 2, y: 2 },
                entities: [],
              },
              {
                coord: { x: 3, y: 2 },
                entities: [],
              },
              {
                coord: { x: 4, y: 2 },
                entities: [],
              },
              {
                coord: { x: 0, y: 3 },
                entities: [],
              },
              {
                coord: { x: 1, y: 3 },
                entities: [],
              },
              {
                coord: { x: 2, y: 3 },
                entities: [],
              },
              {
                coord: { x: 3, y: 3 },
                entities: [],
              },
              {
                coord: { x: 4, y: 3 },
                entities: [],
              },
              {
                coord: { x: 0, y: 4 },
                entities: [],
              },
              {
                coord: { x: 1, y: 4 },
                entities: [],
              },
              {
                coord: { x: 2, y: 4 },
                entities: [],
              },
              {
                coord: { x: 3, y: 4 },
                entities: [],
              },
              {
                coord: { x: 4, y: 4 },
                entities: [],
              },
            ],
          };

          const result = service.deserialize(compiledMap);

          expect(result).toStrictEqual(expected);
        });

        it('should parse a map with an off-map section', () => {
          const compiledMap = `
						5;5
						0,0
						0,1;wall
						1,1;wall
						2,1;door
						3,1;wall
						4,1;wall
						0,3;wall
						1,3;wall
						2,3;wall
						3,3;wall
						4,3;wall
					`;
          const expected: GameEntity['map'] = {
            height: 5,
            width: 5,
            tiles: [
              {
                coord: { x: 0, y: 0 },
                entities: [],
                isStartingTile: true,
              },
              {
                coord: { x: 1, y: 0 },
                entities: [],
              },
              {
                coord: { x: 2, y: 0 },
                entities: [],
              },
              {
                coord: { x: 3, y: 0 },
                entities: [],
              },
              {
                coord: { x: 4, y: 0 },
                entities: [],
              },
              {
                coord: { x: 0, y: 1 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 1, y: 1 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 2, y: 1 },
                entities: [
                  {
                    type: 'non-playable-interactive-entity',
                    canInteract: true,
                    isBlocking: true,
                    isVisible: true,
                    kind: 'door',
                  },
                ],
              },
              {
                coord: { x: 3, y: 1 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 4, y: 1 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 0, y: 2 },

                entities: [],
              },
              {
                coord: { x: 1, y: 2 },

                entities: [],
              },
              {
                coord: { x: 2, y: 2 },

                entities: [],
              },
              {
                coord: { x: 3, y: 2 },

                entities: [],
              },
              {
                coord: { x: 4, y: 2 },

                entities: [],
              },
              {
                coord: { x: 0, y: 3 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 1, y: 3 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 2, y: 3 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 3, y: 3 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 4, y: 3 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'wall',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 0, y: 4 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'off-map',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 1, y: 4 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'off-map',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 2, y: 4 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'off-map',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 3, y: 4 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'off-map',
                    isVisible: true,
                    isBlocking: true,
                    canInteract: false,
                  },
                ],
              },
              {
                coord: { x: 4, y: 4 },
                entities: [
                  {
                    type: 'non-playable-non-interactive-entity',
                    kind: 'off-map',
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

    describe('Negative path', () => {
      it('should throw an InternalServerErrorException if the map has no starting-tile', () => {
        const compiledMap = '1;1';

        expect(() => service.deserialize(compiledMap)).toThrowError(InternalServerErrorException);
      });

      it('should throw an InternalServerErrorException if the map contains unrecognized entities', () => {
        const compiledMap = `
					1;2
					0,0
					0,1;banana
				`;

        expect(() => service.deserialize(compiledMap)).toThrowError(InternalServerErrorException);
      });

      it('should throw an InternalServerErrorException if the map contains invalid metadata', () => {
        expect(() => service.deserialize('-1;2')).toThrowError(InternalServerErrorException);
        expect(() => service.deserialize('0;2')).toThrowError(InternalServerErrorException);
        expect(() => service.deserialize('2;0')).toThrowError(InternalServerErrorException);
        expect(() => service.deserialize('1;-2')).toThrowError(InternalServerErrorException);
        expect(() => service.deserialize('banana;2')).toThrowError(InternalServerErrorException);
        expect(() => service.deserialize('1;banana')).toThrowError(InternalServerErrorException);
        expect(() => service.deserialize('apple;banana')).toThrowError(
          InternalServerErrorException,
        );
      });

      it('should throw an InternalServerErrorException if the map declare an entity out of range', () => {
        const compiledMap = `
					1;2
					0,0
					0,42;door
				`;

        expect(() => service.deserialize(compiledMap)).toThrowError(InternalServerErrorException);
      });
    });
  });
});
