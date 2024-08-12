import { describe, expect, it } from "vitest";
import { PlayerStatusError } from "./player-status.error";
import { PlayerStatus } from "./player-status.vo";

describe("Player Status VO", () => {
  describe("constructor", () => {
    it("should create a new PlayerStatus when inputs are valid", () => {
      const result = new PlayerStatus({ currentPhase: "IDLE" });

      expect(result).toBeInstanceOf(PlayerStatus);
    });
  });

  describe("advanceTo method", () => {
    it("should create a new VO with status updated", () => {
      const playerStatus = new PlayerStatus({ currentPhase: "IDLE" });

      const newLobbyStatus = playerStatus.advanceTo({ currentPhase: "ACTION" });

      expect(playerStatus.current).toEqual("IDLE");
      expect(newLobbyStatus.current).toEqual("ACTION");
    });

    it("should throw when requesting an illegal status change", () => {
      const playerStatus = new PlayerStatus({ currentPhase: "IDLE" });

      expect(() =>
        playerStatus.advanceTo({ currentPhase: "PREPARATION" }),
      ).toThrow(PlayerStatusError);
    });
  });
});
