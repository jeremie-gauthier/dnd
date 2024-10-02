import {
  ClientGameEvent,
  ClientToServerEvents,
  PlayableEntityOpenChestInput,
  PlayableEntityOpenChestOutput,
} from "@dnd/shared";
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

  const openChestHandler = (
    payload: PlayableEntityOpenChestInput,
  ): Promise<PlayableEntityOpenChestOutput> => {
    return socket.emitWithAck(ClientGameEvent.PlayableEntityOpenChest, payload);
  };

  const lootItemHandler: ClientToServerEvents["client.game.player_requests_playable_entity_loot_item"] =
    (payload) => {
      socket.emit(ClientGameEvent.PlayableEntityLootItem, payload);
    };

  const drinkPotionHandler: ClientToServerEvents["client.game.player_requests_playable_entity_drink_potion"] =
    (payload) => {
      socket.emit(ClientGameEvent.PlayableEntityDrinkPotion, payload);
    };

  return {
    move: moveHandler,
    endTurn: endTurnHandler,
    openDoor: openDoorHandler,
    attack: attackHandler,
    deleteItem: deleteItemHandler,
    swapItems: swapItemsHandler,
    openChest: openChestHandler,
    lootItem: lootItemHandler,
    drinkPotion: drinkPotionHandler,
  };
};
