import { Auth0ContextInterface } from "@auth0/auth0-react";
import { redirect } from "@tanstack/react-router";
import { io } from "socket.io-client";

export const getSocket = ({
  getAccessTokenSilently,
}: {
  getAccessTokenSilently: Auth0ContextInterface["getAccessTokenSilently"];
}) => {
  const socket = io(import.meta.env.VITE_API_URL_WS, {
    autoConnect: false,
    async auth(cb) {
      try {
        const token = await getAccessTokenSilently();
        cb({ token });
      } catch (error) {
        throw redirect({
          to: "/login",
        });
      }
    },
  });

  return socket;
};
