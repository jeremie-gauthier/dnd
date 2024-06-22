import { describe, expect, it } from "vitest";
import { LobbyStatusError } from "./lobby-status.error";
import { LobbyStatus } from "./lobby-status.vo";

describe("LobbyStatus VO", () => {
  it("should create a LobbyStatus and access its data", () => {
    const lobbyStatus = new LobbyStatus({ status: "OPENED" });
    expect(lobbyStatus.current).toEqual("OPENED");
  });

  it("should asserts equality", () => {
    const a = new LobbyStatus({ status: "OPENED" });
    const b = new LobbyStatus({ status: "OPENED" });
    const c = new LobbyStatus({ status: "GAME_INITIALIZING" });

    expect(a).not.toBe(b);
    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });

  describe("advanceTo method", () => {
    it("should create a new VO with status updated", () => {
      const lobbyStatus = new LobbyStatus({ status: "OPENED" });

      const newLobbyStatus = lobbyStatus.advanceTo({
        status: "GAME_INITIALIZING",
      });
      expect(lobbyStatus.current).toEqual("OPENED");
      expect(newLobbyStatus.current).toEqual("GAME_INITIALIZING");
    });

    it("should throw when requesting an illegal status change", () => {
      const lobbyStatus = new LobbyStatus({ status: "OPENED" });
      expect(() => lobbyStatus.advanceTo({ status: "GAME_STARTED" })).toThrow();
    });
  });

  describe("mustBeOpened method", () => {
    it("should pass silently", () => {
      const lobbyStatus = new LobbyStatus({ status: "OPENED" });
      expect(() => lobbyStatus.mustBeOpened()).not.toThrow();
    });

    it("should throw on fail", () => {
      const lobbyStatus = new LobbyStatus({ status: "GAME_INITIALIZING" });
      expect(() => lobbyStatus.mustBeOpened()).toThrow(LobbyStatusError);
    });
  });
});
