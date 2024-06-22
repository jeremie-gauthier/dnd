import { z } from "zod";
import { lobbySchema } from "../../database";

export const createLobbyOutputSchema = lobbySchema;

export type CreateLobbyOutput = z.infer<typeof createLobbyOutputSchema>;
