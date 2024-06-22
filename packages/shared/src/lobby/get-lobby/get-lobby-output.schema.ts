import { z } from "zod";
import { lobbySchema } from "../../database";

export const getLobbyOutputSchema = lobbySchema;

export type GetLobbyOutput = z.infer<typeof getLobbyOutputSchema>;
