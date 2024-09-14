import {
  type User,
  useAuth0,
  withAuthenticationRequired,
} from "@auth0/auth0-react";
import { Profile } from "@features/users";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: withAuthenticationRequired(ProfileRouteComponent),
});

export function ProfileRouteComponent() {
  const { user, isLoading } = useAuth0();

  const isUserDataReady = (user?: User): user is User => {
    return isLoading === false && user !== undefined;
  };

  if (!isUserDataReady(user)) {
    return <div>User data is loading</div>;
  }

  return <Profile user={user} />;
}
