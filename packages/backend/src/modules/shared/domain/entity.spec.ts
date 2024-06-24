import { describe, expect, it } from "vitest";
import { Entity } from "./entity";

describe("Entity", () => {
  class FakeEntity extends Entity<Record<string, any>> {}

  it("should create an Entity and access its data", () => {
    const playableCharacter = new FakeEntity({}, "FAKE_ID");
    expect(playableCharacter.id).toEqual("FAKE_ID");
  });

  it("should asserts equality", () => {
    const a = new FakeEntity({}, "FAKE_ID");
    const b = new FakeEntity({}, "FAKE_ID");
    const c = new FakeEntity({}, "WRONG_ID");

    expect(a).not.toBe(b);
    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });
});
