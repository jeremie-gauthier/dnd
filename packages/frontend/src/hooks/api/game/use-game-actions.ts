import { ClientGameEvent, ClientToServerEvents } from "@dnd/shared";
import { ClientSocket } from "../../../types/socket.type";

type Params = {
  socket: ClientSocket;
};

export const useGameActions = ({ socket }: Params) => {
  const moveHandler: ClientToServerEvents["client.game.player_requests_playable_entity_moves"] =
    (payload) => {
      socket.emit(ClientGameEvent.PlayableEntityMoves, payload);
    };

  const endTurnHandler: ClientToServerEvents["client.game.player_requests_playable_entity_turn_ends"] =
    (payload) => {
      socket.emit(ClientGameEvent.PlayableEntityTurnEnds, payload);
    };

  const openDoorHandler: ClientToServerEvents["client.game.player_requests_playable_entity_open_door"] =
    (payload) => {
      socket.emit(ClientGameEvent.PlayableEntityOpenDoor, payload);
    };

  const attackHandler: ClientToServerEvents["client.game.player_requests_playable_entity_attacks"] =
    (payload) => {
      socket.emit(ClientGameEvent.PlayableEntityAttacks, payload);
    };

  const deleteItemHandler: ClientToServerEvents["client.game.player_requests_playable_entity_delete_item"] =
    (payload) => {
      socket.emit(ClientGameEvent.PlayableEntityDeleteItem, payload);
    };

  const swapItemsHandler: ClientToServerEvents["client.game.player_requests_playable_entity_swap_items"] =
    (payload) => {
      socket.emit(ClientGameEvent.PlayableEntitySwapItems, payload);
    };

  return {
    move: moveHandler,
    endTurn: endTurnHandler,
    openDoor: openDoorHandler,
    attack: attackHandler,
    deleteItem: deleteItemHandler,
    swapItems: swapItemsHandler,
  };
};
