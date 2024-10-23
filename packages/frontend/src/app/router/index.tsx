import { Auth0ContextInterface, useAuth0 } from "@auth0/auth0-react";
import { getSocket } from "@config/socket";
import { NotFound } from "@features/not-found/not-found.component";
import { queryClient } from "@lib/react-query";
import {
  ErrorComponent,
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
import { useMemo } from "react";
import { routeTree } from "./route-tree.gen";

const getRouter = ({
  getAccessTokenSilently,
}: {
  getAccessTokenSilently: Auth0ContextInterface["getAccessTokenSilently"];
}) =>
  createRouter({
    routeTree,
    defaultNotFoundComponent: NotFound,
    defaultPendingComponent: () => (
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="border-8 border-slate-400 border-t-slate-800 rounded-full size-12 duration-300 animate-spin" />
      </div>
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
