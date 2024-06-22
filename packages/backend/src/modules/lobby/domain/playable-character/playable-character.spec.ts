import { UniqueId } from "src/modules/shared/domain/unique-id";
import { describe, expect, it } from "vitest";
import { UserStatus } from "../user-status/user-status.vo";
import { User } from "../user/user.entity";
import { FAKE_USER } from "../user/user.fixtures";
import { PlayableCharacter } from "./playable-character.entity";
import { FAKE_HERO } from "./playable-character.fixtures";

describe("PlayableCharacter Entity", () => {
  it("should create a PlayableCharacter and access its data", () => {
    const playableCharacter = new PlayableCharacter(FAKE_HERO);
    expect(playableCharacter.type).toEqual("hero");
  });

  describe("setOwner method", () => {
    it("should set new owner", () => {
      const playableCharacter = new PlayableCharacter(FAKE_HERO);
      const user = new User(FAKE_USER);

      expect(playableCharacter.pickedBy).toBeUndefined();
      playableCharacter.setOwner({ user });
      expect(playableCharacter.pickedBy).toEqual(user.id);
    });

    it("should fail to set new owner when already picked", () => {
      const playableCharacter = new PlayableCharacter({
        ...FAKE_HERO,
        pickedBy: new UniqueId(),
      });
      const user = new User(FAKE_USER);

      expect(() => playableCharacter.setOwner({ user })).toThrow();
    });

    it("should fail to set new owner when user is ready", () => {
      const playableCharacter = new PlayableCharacter(FAKE_HERO);
      const user = new User({ ...FAKE_USER, status: new UserStatus(true) });

      expect(() => playableCharacter.setOwner({ user })).toThrow();
    });
  });

  describe("unsetOwner method", () => {
    it("should unset owner", () => {
      const user = new User(FAKE_USER);
      const playableCharacter = new PlayableCharacter({
        ...FAKE_HERO,
        pickedBy: user.id,
      });

      expect(playableCharacter.pickedBy).toEqual(user.id);
      playableCharacter.unsetOwner({ user });
      expect(playableCharacter.pickedBy).toBeUndefined();
    });

    it("should fail to unset new owner when he does not own it", () => {
      const playableCharacter = new PlayableCharacter({
        ...FAKE_HERO,
        pickedBy: new UniqueId(),
      });
      const user = new User(FAKE_USER);

      expect(() => playableCharacter.unsetOwner({ user })).toThrow();
    });

    it("should fail to unset new owner when user is ready", () => {
      const user = new User({ ...FAKE_USER, status: new UserStatus(true) });
      const playableCharacter = new PlayableCharacter({
        ...FAKE_HERO,
        pickedBy: user.id,
      });

      expect(() => playableCharacter.unsetOwner({ user })).toThrow();
    });
  });
});
