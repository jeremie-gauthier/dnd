import { withAuthenticationRequired } from '@auth0/auth0-react';
import { FileRoute } from '@tanstack/react-router';
import { io } from 'socket.io-client';

export const Route = new FileRoute('/ws').createRoute({
  beforeLoad: () => {
    const auth0StoreFromStorage = localStorage.getItem(
      import.meta.env.VITE_AUTH0_LOCALSTORAGE_TOKEN_KEY,
    );
    if (!auth0StoreFromStorage) {
      throw new Error('No auth token found');
    }

    const auth0Store = JSON.parse(auth0StoreFromStorage);

    const socket = io('ws://localhost:3000', {
      auth(cb) {
        cb({
          token: auth0Store.body.access_token,
        });
      },
    });

    return {
      socket,
    };
  },
  component: withAuthenticationRequired(WsRouteComponent),
});

export function WsRouteComponent() {
  const { socket } = Route.useRouteContext();

  socket.emit('client.lobby.request_new_game', { msg: 'Hello world' });

  return <div>Websocket page</div>;
}
