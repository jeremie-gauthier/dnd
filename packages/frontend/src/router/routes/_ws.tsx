import { withAuthenticationRequired } from "@auth0/auth0-react";
import { FileRoute, Outlet } from "@tanstack/react-router";

export const Route = new FileRoute("/_ws").createRoute({
  beforeLoad: ({ context }) => {
    return new Promise((resolve, reject) => {
      if (context.socket.connected) {
        resolve({});
      } else {
        context.socket.on("connect", () => {
          resolve({});
        });

        context.socket.on("connect_error", (err) => {
          // TODO: l'erreur thrown dans l'option auth(cb) n'est pas recu ici
          // ? comment handle l'erreur pour redirect to login page
          console.error("connect_error", err);
          reject(err);
        });

        context.socket.connect();
      }
    });
  },
  onLeave: ({ context }) => {
    const { socket } = context;
    socket.disconnect();
  },
  component: withAuthenticationRequired(WsRouteComponent),
});

export function WsRouteComponent() {
  const { socket } = Route.useRouteContext();

  return (
    <div>
      <div>socket id: {socket.id}</div>
      <Outlet />
    </div>
  );
}
