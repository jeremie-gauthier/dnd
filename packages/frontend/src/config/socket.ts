import { io } from 'socket.io-client';

export const socket = io('ws://localhost:3000', {
  autoConnect: false,
  auth(cb) {
    const auth0StoreFromStorage = localStorage.getItem(
      import.meta.env.VITE_AUTH0_LOCALSTORAGE_TOKEN_KEY,
    );
    if (!auth0StoreFromStorage) {
      throw new Error('No auth token found');
    }

    const auth0Store = JSON.parse(auth0StoreFromStorage);

    cb({
      token: auth0Store.body.access_token,
    });
  },
});
