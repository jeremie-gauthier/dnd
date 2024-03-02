import { ErrorComponent, Router, RouterProvider } from "@tanstack/react-router";
import { queryClient } from "../config/fetcher";
import { socket } from "../config/socket";
import { routeTree } from "./routeTree.gen";

const router = new Router({
  routeTree,
  defaultPendingComponent: () => (
    <div className={"p-2 text-2xl"}>Route is loading</div>
  ),
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    queryClient,
    socket,
  },
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

export function AppRouter() {
  return <RouterProvider router={router} context={{}} />;
}
