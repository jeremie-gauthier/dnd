import { useAuth0 } from "@auth0/auth0-react";
import type { getLobbiesOutputSchema } from "@dnd/shared";
import { fetcherWithAuth } from "@lib/react-query";
import { useQuery } from "@tanstack/react-query";
import type { z } from "zod";

export type GetLobbiesResponse = z.infer<typeof getLobbiesOutputSchema>;

export const GET_LOBBIES_QUERY_KEY = ["lobbies"];

export const useGetLobbies = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: GET_LOBBIES_QUERY_KEY,
    queryFn: () =>
      fetcherWithAuth<GetLobbiesResponse>(
        "http://localhost:3000/lobby/private/get-lobbies",
        getAccessTokenSilently,
      ),
  });
};
