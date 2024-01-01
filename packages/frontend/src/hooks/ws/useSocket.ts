import { Route } from '../../router/routes/_ws';

export const useSocket = () => {
  const { socket } = Route.useRouteContext();

  return socket;
};
