import { GameEntity } from "@dnd/shared";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { GameEvent } from "src/game/events/emitters/game-events.enum";
import { InitiativesRerolledPayload } from "src/game/events/emitters/initiatives-rerolled.payload";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { InitiativeService } from "./initiative.service";

describe("InitiativeService", () => {
  let service: InitiativeService;
  let eventEmitter2: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InitiativeService, EventEmitter2],
    }).compile();

    service = module.get(InitiativeService);
    eventEmitter2 = module.get(EventEmitter2);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(eventEmitter2).toBeDefined();
  });

  describe("rollPlayableEntitiesInitiative", () => {
    it("should set a random initiative score on entities", () => {
      vi.spyOn(Math, "random")
        .mockReturnValueOnce(0.4)
        .mockReturnValueOnce(0.2)
        .mockReturnValueOnce(0.1)
        .mockReturnValueOnce(0.3);
      const eventEmitter = vi.spyOn(eventEmitter2, "emitAsync");

      const GAME_MOCK = {
        playableEntities: {
          "fake-hero-id-1": {
            id: "fake-hero-id-1",
            initiative: Number.NaN,
          },
          "fake-hero-id-2": {
            id: "fake-hero-id-2",
            initiative: Number.NaN,
          },
          "fake-hero-id-3": {
            id: "fake-hero-id-3",
            initiative: Number.NaN,
          },
          "fake-hero-id-4": {
            id: "fake-hero-id-4",
            initiative: Number.NaN,
          },
        },
        timeline: [],
      } as unknown as GameEntity;

      const expected = {
        playableEntities: {
          "fake-hero-id-1": {
            id: "fake-hero-id-1",
            initiative: 40,
          },
          "fake-hero-id-2": {
            id: "fake-hero-id-2",
            initiative: 20,
          },
          "fake-hero-id-3": {
            id: "fake-hero-id-3",
            initiative: 10,
          },
          "fake-hero-id-4": {
            id: "fake-hero-id-4",
            initiative: 30,
          },
        },
        timeline: [],
      };

      service.rollPlayableEntitiesInitiative({ game: GAME_MOCK });

      expect(eventEmitter).toHaveBeenCalledOnce();
      expect(eventEmitter).toHaveBeenCalledWith(
        GameEvent.InitiativesRerolled,
        new InitiativesRerolledPayload({ game: GAME_MOCK }),
      );
      expect(GAME_MOCK).toStrictEqual(expected);
    });
  });
});
