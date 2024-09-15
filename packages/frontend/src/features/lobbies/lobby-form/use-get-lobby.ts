import { useAuth0 } from "@auth0/auth0-react";
import type { getLobbyOutputSchema } from "@dnd/shared";
import { fetcherWithAuth } from "@lib/react-query";
import { useQuery } from "@tanstack/react-query";
import type { z } from "zod";

export type GetLobbyResponse = z.infer<typeof getLobbyOutputSchema>;

export const GET_LOBBY_QUERY_KEY = (lobbyId: string) => ["lobby", lobbyId];

export const useGetLobby = (lobbyId: string) => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: GET_LOBBY_QUERY_KEY(lobbyId),
    queryFn: () =>
      fetcherWithAuth<GetLobbyResponse>(
        `http://localhost:3000/lobby/private/get-lobby/${lobbyId}`,
        getAccessTokenSilently,
      ),
  });
};
