import { Profile } from "@features/users/profile/profile.component";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  beforeLoad: ({ context }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  component: ProfileRouteComponent,
});

export function ProfileRouteComponent() {
  const { auth } = Route.useRouteContext();

  return <Profile user={auth?.user!} />;
}
