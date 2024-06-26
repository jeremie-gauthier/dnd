import { useAuth0 } from "@auth0/auth0-react";
import { GameEntity, GetUserGameStateOutput } from "@dnd/shared";
import { useQuery } from "@tanstack/react-query";
import { fetcherWithAuth } from "../../../config/fetcher";

export const GET_PLAYER_GAME_STATE_QUERY_KEY = (gameId: GameEntity["id"]) => [
  "game",
  gameId,
];

export const useGetPlayerGameState = (gameId: GameEntity["id"]) => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: GET_PLAYER_GAME_STATE_QUERY_KEY(gameId),
    queryFn: () =>
      fetcherWithAuth<GetUserGameStateOutput>(
        `http://localhost:3000/game/private/get-user-game-state/${gameId}`,
        getAccessTokenSilently,
      ),
    enabled: gameId !== undefined,
  });
};
