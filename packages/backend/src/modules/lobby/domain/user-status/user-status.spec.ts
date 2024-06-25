import { describe, expect, it } from "vitest";
import { UserStatusError } from "./user-status.error";
import { UserStatus } from "./user-status.vo";

describe("UserStatus VO", () => {
  it("should create a UserStatus and access its data", () => {
    const playerStatus = new UserStatus(true);
    expect(playerStatus.isReady).toBe(true);
  });

  it("should assert equality when values are the same", () => {
    const a = new UserStatus(true);
    const b = new UserStatus(true);
    const c = new UserStatus(false);

    expect(a).not.toBe(b);
    expect(a).not.toBe(c);
    expect(b).not.toBe(c);

    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });

  describe("toggle method", () => {
    it("should return a new status of the opposite value", () => {
      const playerStatus = new UserStatus(false);
      expect(playerStatus.isReady).toBe(false);

      const updatedUserStatus = playerStatus.toggle();
      expect(playerStatus.isReady).toBe(false);
      expect(updatedUserStatus.isReady).toBe(true);
      expect(playerStatus).not.toBe(updatedUserStatus);
    });
  });

  describe("setNotReady method", () => {
    it("should return a new status with false value", () => {
      {
        const playerStatus = new UserStatus(true);
        expect(playerStatus.isReady).toBe(true);

        const updatedUserStatus = playerStatus.setNotReady();
        expect(playerStatus.isReady).toBe(true);
        expect(updatedUserStatus.isReady).toBe(false);
        expect(playerStatus).not.toBe(updatedUserStatus);
      }

      {
        const playerStatus = new UserStatus(false);
        expect(playerStatus.isReady).toBe(false);

        const updatedUserStatus = playerStatus.setNotReady();
        expect(playerStatus.isReady).toBe(false);
        expect(updatedUserStatus.isReady).toBe(false);
        expect(playerStatus).not.toBe(updatedUserStatus);
      }
    });
  });

  describe("mustNotBeReady method", () => {
    it("should pass silently", () => {
      const playerStatus = new UserStatus(false);
      expect(() => playerStatus.mustNotBeReady()).not.toThrow();
    });

    it("should throw on fail", () => {
      const playerStatus = new UserStatus(true);
      expect(() => playerStatus.mustNotBeReady()).toThrow(UserStatusError);
    });
  });
});
