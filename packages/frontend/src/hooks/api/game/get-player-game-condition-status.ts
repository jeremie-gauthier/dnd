import { GameView } from "@dnd/shared";
import { useQuery } from "@tanstack/react-query";

export const GET_PLAYER_GAME_CONDITION_STATUS_QUERY_KEY = (
  gameId: GameView["id"],
) => ["game_condition_status", gameId];

export const useGetPlayerGameConditionStatus = (gameId: GameView["id"]) => {
  return useQuery({
    queryKey: GET_PLAYER_GAME_CONDITION_STATUS_QUERY_KEY(gameId),
    initialData: "ongoing",
  });
};
