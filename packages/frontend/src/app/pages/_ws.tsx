import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_ws")({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }

    if (context.socket.connected) {
      return context;
    }

    try {
      await new Promise((resolve, reject) => {
        context.socket.on("connect", () => {
          resolve(context);
        });

        context.socket.on("connect_error", (err) => {
          console.error("connect_error", err);
          reject(err);
        });

        context.socket.connect();
      });
    } catch (error) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  onLeave: ({ context }) => {
    const { socket } = context;
    socket.disconnect();
  },
  component: WsRouteComponent,
});

export function WsRouteComponent() {
  return <Outlet />;
}
