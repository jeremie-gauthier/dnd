import { z } from "zod";
import { lobbyConfigSchema } from "../../database/lobby/lobby-config.interface";

export const createLobbyInputSchema = lobbyConfigSchema
  .pick({ nbPlayersMax: true })
  .merge(
    z.object({
      stageId: z.string().uuid(),
    }),
  );

export type CreateLobbyInput = z.infer<typeof createLobbyInputSchema>;
