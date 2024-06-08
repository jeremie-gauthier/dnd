import { GameEntity } from "@dnd/shared";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { TurnService } from "./turn.service";

describe("TurnService", () => {
  let service: TurnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TurnService, EventEmitter2],
    }).compile();

    service = module.get(TurnService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getPlayingEntity", () => {
    it("should return the currently playing entity", () => {
      const GAME_MOCK = {
        playableEntities: {
          "fake-hero-id-1": {
            id: "fake-hero-id-1",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-2": {
            id: "fake-hero-id-2",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-3": {
            id: "fake-hero-id-3",
            currentPhase: "action",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-4": {
            id: "fake-hero-id-4",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
        },
      } as unknown as GameEntity;
      const expected = {
        id: "fake-hero-id-3",
        currentPhase: "action",
        characteristic: { healthPoints: 10 },
      };

      const result = service.getPlayingEntity({ game: GAME_MOCK });

      expect(result).toStrictEqual(expected);
    });

    it("should return undefined when no entity is in action phase", () => {
      const GAME_MOCK = {
        playableEntities: {
          "fake-hero-id-1": {
            id: "fake-hero-id-1",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-2": {
            id: "fake-hero-id-2",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-3": {
            id: "fake-hero-id-3",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-4": {
            id: "fake-hero-id-4",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
        },
      } as unknown as GameEntity;
      const expected = undefined;

      const result = service.getPlayingEntity({ game: GAME_MOCK });

      expect(result).toStrictEqual(expected);
    });
  });

  describe("getNextEntityToPlay", () => {
    it("should return the next entity to play in the timeline", () => {
      const GAME_MOCK = {
        playableEntities: {
          "fake-hero-id-1": {
            id: "fake-hero-id-1",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-2": {
            id: "fake-hero-id-2",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-3": {
            id: "fake-hero-id-3",
            currentPhase: "action",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-4": {
            id: "fake-hero-id-4",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
        },
        timeline: [
          "fake-hero-id-1",
          "fake-hero-id-2",
          "fake-hero-id-3",
          "fake-hero-id-4",
        ],
      } as unknown as GameEntity;
      const expected = {
        id: "fake-hero-id-4",
        currentPhase: "idle",
        characteristic: { healthPoints: 10 },
      };

      const result = service.getNextEntityToPlay({ game: GAME_MOCK });

      expect(result).toStrictEqual(expected);
    });

    it("should return the first entity in the timeline when no one is playing", () => {
      const GAME_MOCK = {
        playableEntities: {
          "fake-hero-id-1": {
            id: "fake-hero-id-1",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-2": {
            id: "fake-hero-id-2",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-3": {
            id: "fake-hero-id-3",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-4": {
            id: "fake-hero-id-4",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
        },
        timeline: [
          "fake-hero-id-1",
          "fake-hero-id-2",
          "fake-hero-id-3",
          "fake-hero-id-4",
        ],
      } as unknown as GameEntity;
      const expected = {
        id: "fake-hero-id-1",
        currentPhase: "idle",
        characteristic: { healthPoints: 10 },
      };

      const result = service.getNextEntityToPlay({ game: GAME_MOCK });

      expect(result).toStrictEqual(expected);
    });

    it("should return undefined when the timeline is empty", () => {
      const GAME_MOCK = {
        playableEntities: {
          "fake-hero-id-1": {
            id: "fake-hero-id-1",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-2": {
            id: "fake-hero-id-2",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-3": {
            id: "fake-hero-id-3",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
          "fake-hero-id-4": {
            id: "fake-hero-id-4",
            currentPhase: "idle",
            characteristic: { healthPoints: 10 },
          },
        },
        timeline: [],
      } as unknown as GameEntity;
      const expected = undefined;

      const result = service.getNextEntityToPlay({ game: GAME_MOCK });

      expect(result).toStrictEqual(expected);
    });
  });
});
