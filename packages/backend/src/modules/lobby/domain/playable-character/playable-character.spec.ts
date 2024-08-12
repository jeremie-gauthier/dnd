import { describe, expect, it } from "vitest";
import { UserStatus } from "../user-status/user-status.vo";
import { User } from "../user/user.entity";
import { getFakeUserData } from "../user/user.fixtures";
import { PlayableCharacter } from "./playable-character.entity";
import {
  FAKE_GAME_MASTER_ID,
  getFakeHero,
} from "./playable-character.fixtures";

describe("PlayableCharacter Entity", () => {
  it("should create a PlayableCharacter and access its data", () => {
    const playableCharacter = new PlayableCharacter(getFakeHero());
    expect(playableCharacter.type).toEqual("hero");
  });

  describe("setOwner method", () => {
    it("should set new owner", () => {
      const playableCharacter = new PlayableCharacter(getFakeHero());
      const user = new User(getFakeUserData());

      expect(playableCharacter.pickedBy).toBeUndefined();
      playableCharacter.setOwner({ user });
      expect(playableCharacter.pickedBy).toEqual(user.id);
    });

    it("should fail to set new owner when already picked", () => {
      const playableCharacter = new PlayableCharacter({
        ...getFakeHero(),
        pickedBy: FAKE_GAME_MASTER_ID,
      });
      const user = new User(getFakeUserData());

      expect(() => playableCharacter.setOwner({ user })).toThrow();
    });

    it("should fail to set new owner when user is ready", () => {
      const playableCharacter = new PlayableCharacter(getFakeHero());
      const user = new User({
        ...getFakeUserData(),
        status: new UserStatus(true),
      });

      expect(() => playableCharacter.setOwner({ user })).toThrow();
    });
  });

  describe("unsetOwner method", () => {
    it("should unset owner", () => {
      const user = new User(getFakeUserData());
      const playableCharacter = new PlayableCharacter({
        ...getFakeHero(),
        pickedBy: user.id,
      });

      expect(playableCharacter.pickedBy).toEqual(user.id);
      playableCharacter.unsetOwner({ user });
      expect(playableCharacter.pickedBy).toBeUndefined();
    });

    it("should fail to unset new owner when he does not own it", () => {
      const playableCharacter = new PlayableCharacter({
        ...getFakeHero(),
        pickedBy: FAKE_GAME_MASTER_ID,
      });
      const user = new User(getFakeUserData());

      expect(() => playableCharacter.unsetOwner({ user })).toThrow();
    });

    it("should fail to unset new owner when user is ready", () => {
      const user = new User({
        ...getFakeUserData(),
        status: new UserStatus(true),
      });
      const playableCharacter = new PlayableCharacter({
        ...getFakeHero(),
        pickedBy: user.id,
      });

      expect(() => playableCharacter.unsetOwner({ user })).toThrow();
    });
  });
});
