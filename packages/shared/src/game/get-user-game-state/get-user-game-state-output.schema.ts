import { z } from "zod";
import { PlayerGameState } from "../../ws-events";

export const getUserGameStateOutputSchema = z.object({});

export type GetUserGameStateOutput = PlayerGameState;
