import { UniqueId } from "src/modules/shared/domain/unique-id";
import { describe, expect, it } from "vitest";
import { User } from "./user.entity";
import { FAKE_USER_ID, getFakeUserData } from "./user.fixtures";

describe("User Entity", () => {
  it("should create a User and access its data", () => {
    const user = new User(getFakeUserData());

    expect(user.id).toEqual(new UniqueId(FAKE_USER_ID));
    expect(user.status.isReady).toBe(false);
  });
});

describe("toggleStatus method", () => {
  it("should toggle the ready status", () => {
    const user = new User(getFakeUserData());

    expect(user.status.isReady).toBe(false);
    user.toggleStatus();
    expect(user.status.isReady).toBe(true);
  });
});

describe("setNotReadyStatus method", () => {
  it("should set the ready status to false", () => {
    const user = new User(getFakeUserData());
    const prevStatus = user.status;

    expect(user.status.isReady).toBe(false);
    expect(user.status).toBe(prevStatus);
    user.setNotReadyStatus();
    expect(user.status.isReady).toBe(false);
    expect(user.status).not.toBe(prevStatus);
  });
});
