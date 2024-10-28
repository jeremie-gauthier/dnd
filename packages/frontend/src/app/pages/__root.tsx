import { Auth0ContextInterface, User } from "@auth0/auth0-react";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ClientSocket } from "../../types/socket.type";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  socket: ClientSocket;
  auth?: Auth0ContextInterface<User>;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex flex-col justify-center">
        <Outlet />
      </div>

      {import.meta.env.VITE_AUTH0_ENV === "development" && (
        <>
          <ReactQueryDevtools buttonPosition="top-right" />
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
    </>
  );
}
