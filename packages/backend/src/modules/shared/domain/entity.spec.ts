import { UniqueId } from "src/modules/shared/domain/unique-id";
import { describe, expect, it } from "vitest";
import { Entity } from "./entity";

describe("Entity", () => {
  class FakeEntity extends Entity<Record<string, any>> {}

  it("should create an Entity and access its data", () => {
    {
      const playableCharacter = new FakeEntity({}, new UniqueId("FAKE_ID"));
      expect(playableCharacter.id).toEqual(new UniqueId("FAKE_ID"));
    }

    {
      const playableCharacter = new FakeEntity({});
      expect(typeof playableCharacter.id.id).toBe("string");
    }
  });

  it("should asserts equality", () => {
    const a = new FakeEntity({}, new UniqueId("FAKE_ID"));
    const b = new FakeEntity({}, new UniqueId("FAKE_ID"));
    const c = new FakeEntity({}, new UniqueId("WRONG_ID"));

    expect(a).not.toBe(b);
    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });
});
