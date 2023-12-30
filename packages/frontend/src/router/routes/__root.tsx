import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet, rootRouteWithContext, useRouterState } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Socket } from 'socket.io-client';

function RouterLoader() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' });

  if (isLoading) {
    return <div>Route is loading</div>;
  } else {
    return null;
  }
}

export const Route = rootRouteWithContext<{
  queryClient: QueryClient;
  socket: Socket;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className={`min-h-screen flex flex-col`}>
        <div className={`flex items-center border-b gap-2`}>
          <h1 className={`text-3xl p-2`}>DnD</h1>
          <div className={`text-3xl`}>
            <RouterLoader />
          </div>
        </div>

        <div className={`flex-1 flex`}>
          <Outlet />
        </div>
      </div>

      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
