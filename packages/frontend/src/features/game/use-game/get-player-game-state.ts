import { useAuth0 } from "@auth0/auth0-react";
import { GameView, GetUserGameStateOutput } from "@dnd/shared";
import { fetcherWithAuth } from "@lib/react-query";
import { useQuery } from "@tanstack/react-query";

export const GET_PLAYER_GAME_STATE_QUERY_KEY = (gameId: GameView["id"]) => [
  "game",
  gameId,
];

export const useGetPlayerGameState = (gameId: GameView["id"]) => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: GET_PLAYER_GAME_STATE_QUERY_KEY(gameId),
    queryFn: () =>
      fetcherWithAuth<GetUserGameStateOutput>(
        `/game/private/get-user-game-state/${gameId}`,
        getAccessTokenSilently,
      ),
    enabled: gameId !== undefined,
  });
};
