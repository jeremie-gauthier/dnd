import { CurrentPhase } from "src/modules/game/infra/database/enums/current-phase.enum";
import { describe, expect, it } from "vitest";
import { PlayerStatusError } from "./player-status.error";
import { PlayerStatus } from "./player-status.vo";

describe("Player Status VO", () => {
  describe("constructor", () => {
    it("should create a new PlayerStatus when inputs are valid", () => {
      const result = new PlayerStatus(CurrentPhase.IDLE);

      expect(result).toBeInstanceOf(PlayerStatus);
    });
  });

  describe("advanceTo method", () => {
    it("should create a new VO with status updated", () => {
      const playerStatus = new PlayerStatus(CurrentPhase.IDLE);

      const newLobbyStatus = playerStatus.advanceTo(CurrentPhase.ACTION);

      expect(playerStatus.current).toEqual("IDLE");
      expect(newLobbyStatus.current).toEqual("ACTION");
    });

    it("should throw when requesting an illegal status change", () => {
      const playerStatus = new PlayerStatus(CurrentPhase.IDLE);

      expect(() => playerStatus.advanceTo(CurrentPhase.PREPARATION)).toThrow(
        PlayerStatusError,
      );
    });
  });
});
