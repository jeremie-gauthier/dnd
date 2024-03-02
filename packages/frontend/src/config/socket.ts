import { io } from "socket.io-client";

export const socket = io("ws://localhost:3000", {
  autoConnect: false,
  auth(cb) {
    const auth0StoreFromStorage = localStorage.getItem(
      import.meta.env.VITE_AUTH0_LOCALSTORAGE_TOKEN_KEY,
    );
    if (!auth0StoreFromStorage) {
      throw new Error("No auth token found");
    }

    const auth0Store = JSON.parse(auth0StoreFromStorage);

    // TODO: quand le token expire, il n'est plus present dans le body
    // ! et donc le handshake coté serveur fail et l'app rentre dans un etat d'erreur bizarre
    cb({
      token: auth0Store.body.access_token,
    });
  },
});
