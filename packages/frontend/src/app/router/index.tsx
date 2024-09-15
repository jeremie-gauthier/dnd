import { socket } from "@config/socket";
import { queryClient } from "@lib/react-query";
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
import { routeTree } from "./route-tree.gen";

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <div className="p-2 text-2xl">Route is loading</div>
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

export const AppRouter = () => {
  return <RouterProvider router={router} context={{}} />;
};
