import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Outlet,
  rootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { ClientSocket } from "../../types/socket.type";

function RouterLoader() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });

  if (isLoading) {
    return <div>Route is loading</div>;
  } else {
    return null;
  }
}

export const Route = rootRouteWithContext<{
  queryClient: QueryClient;
  socket: ClientSocket;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className={"min-h-screen flex flex-col"}>
        <h1 className={"text-3xl p-2"}>DnD</h1>
        <div className={"text-3xl"}>
          <RouterLoader />
        </div>

        <div className="flex flex-col justify-center">
          <Outlet />
        </div>
      </div>

      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
