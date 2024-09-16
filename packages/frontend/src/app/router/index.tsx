import { getSocket } from "@config/socket";
import { queryClient } from "@lib/react-query";
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
import { routeTree } from "./route-tree.gen";
import { Auth0ContextInterface, useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";

const getRouter = ({
  getAccessTokenSilently,
}: {
  getAccessTokenSilently: Auth0ContextInterface["getAccessTokenSilently"];
}) =>
  createRouter({
    routeTree,
    defaultPendingComponent: () => (
      <div className="p-2 text-2xl">Route is loading</div>
    ),
    defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
    context: {
      queryClient,
      socket: getSocket({ getAccessTokenSilently }),
      auth: undefined,
    },
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
  });

export const AppRouter = () => {
  const auth = useAuth0();
  const router = useMemo(
    () => getRouter({ getAccessTokenSilently: auth.getAccessTokenSilently }),
    [auth.getAccessTokenSilently],
  );

  return <RouterProvider router={router} context={{ auth }} />;
};
