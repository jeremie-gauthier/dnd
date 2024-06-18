import { UniqueId } from "src/modules/shared/domain/unique-id";
import { describe, expect, it } from "vitest";
import { UserStatus } from "../user-status/user-status.vo";
import { User } from "./user.entity";
import { FAKE_USER, FAKE_USER_ID } from "./user.fixtures";

describe("User Entity", () => {
  it("should create a User and access its data", () => {
    const user = new User(FAKE_USER);

    expect(user.id).toEqual(new UniqueId(FAKE_USER_ID));
    expect(user.status.isReady).toBe(false);
  });

  it("should throw when input props are invalid", () => {
    expect(
      () =>
        new User({
          // @ts-expect-error: for testing purpose
          userId: "wrong-uuid",
          isReady: new UserStatus(true),
          role: "player",
        }),
    ).toThrow();
  });

  describe("toggleStatus method", () => {
    it("should toggle the ready status", () => {
      const user = new User(FAKE_USER);

      expect(user.status.isReady).toBe(false);
      user.toggleStatus();
      expect(user.status.isReady).toBe(true);
    });
  });

  describe("setNotReadyStatus method", () => {
    it("should set the ready status to false", () => {
      const user = new User(FAKE_USER);
      const prevStatus = user.status;

      expect(user.status.isReady).toBe(false);
      expect(user.status).toBe(prevStatus);
      user.setNotReadyStatus();
      expect(user.status.isReady).toBe(false);
      expect(user.status).not.toBe(prevStatus);
    });
  });
});
