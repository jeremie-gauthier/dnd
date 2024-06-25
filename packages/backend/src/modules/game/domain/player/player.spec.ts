import { describe, expect, it } from "vitest";
import { Player } from "./player.entity";
import { FAKE_PLAYER_ID, getFakePlayerData } from "./player.fixtures";

describe("Player Entity", () => {
  it("should create a User and access its data", () => {
    const user = new Player(getFakePlayerData());

    expect(user.id).toEqual(FAKE_PLAYER_ID);
  });
});
