import { GameEntity, PlayableEntity } from "@dnd/shared";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { EntityDiedPayload } from "src/modules/game/events/entity-died.payload";
import { EntityTookDamagePayload } from "src/modules/game/events/entity-took-damage.payload";
import { GameEvent } from "src/modules/game/events/game-event.enum";
import {
  MockInstance,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { CoordService } from "../coord/coord.service";
import { DiceService } from "../dice/dice.service";
import { MapService } from "../map/map.service";
import { CombatService } from "./combat.service";

describe("CombatService", () => {
  let service: CombatService;
  let eventEmitter2: EventEmitter2;

  let eventEmitterMock: MockInstance<
    [event: any, ...values: any[]],
    Promise<any[]>
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CombatService,
        CoordService,
        MapService,
        {
          provide: DiceService,
          useValue: {},
        },
        EventEmitter2,
      ],
    }).compile();

    service = module.get(CombatService);
    eventEmitter2 = module.get(EventEmitter2);

    eventEmitterMock = vi.spyOn(eventEmitter2, "emitAsync");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
    expect(eventEmitter2).toBeDefined();
  });

  describe("takeDamage", () => {
    it("should minus the target's HP value", () => {
      const payload = {
        game: {} as unknown as GameEntity,
        target: { characteristic: { healthPoints: 10 } } as PlayableEntity,
        amount: 2,
      };

      service.takeDamage(payload);

      expect(payload.target.characteristic.healthPoints).toEqual(8);
      expect(eventEmitterMock).toHaveBeenCalledOnce();
      expect(eventEmitterMock).toHaveBeenCalledWith(
        GameEvent.EntityTookDamage,
        new EntityTookDamagePayload({
          game: {} as unknown as GameEntity,
          target: { characteristic: { healthPoints: 8 } } as PlayableEntity,
          amount: 2,
        }),
      );
    });

    it("should declare the target entity dead when HP is lte 0", () => {
      const payload = {
        game: {} as unknown as GameEntity,
        target: {
          characteristic: { healthPoints: 10 },
          isBlocking: true,
        } as PlayableEntity,
        amount: 12,
      };

      service.takeDamage(payload);

      expect(payload.target.characteristic.healthPoints).toEqual(0);
      expect(eventEmitterMock).toHaveBeenCalledTimes(2);
      expect(eventEmitterMock).toHaveBeenCalledWith(
        GameEvent.EntityTookDamage,
        new EntityTookDamagePayload({
          game: {} as unknown as GameEntity,
          target: {
            characteristic: { healthPoints: 0 },
            isBlocking: false,
          } as PlayableEntity,
          amount: 12,
        }),
      );
      expect(eventEmitterMock).toHaveBeenCalledWith(
        GameEvent.EntityDied,
        new EntityDiedPayload({
          game: {} as unknown as GameEntity,
          target: {
            characteristic: { healthPoints: 0 },
            isBlocking: false,
          } as PlayableEntity,
        }),
      );
    });
  });

  describe("entityDeath", () => {
    it("should declare the target entity dead", () => {
      const payload = {
        game: {} as unknown as GameEntity,
        target: {
          characteristic: { healthPoints: 10 },
          isBlocking: true,
        } as PlayableEntity,
      };

      service.entityDeath(payload);

      expect(payload.target.characteristic.healthPoints).toEqual(0);
      expect(eventEmitterMock).toHaveBeenCalledTimes(1);
      expect(eventEmitterMock).toHaveBeenCalledWith(
        GameEvent.EntityDied,
        new EntityDiedPayload({
          game: {} as unknown as GameEntity,
          target: {
            characteristic: { healthPoints: 0 },
            isBlocking: false,
          } as PlayableEntity,
        }),
      );
    });
  });
});
