import { User, useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { FileRoute } from "@tanstack/react-router";
import Profile from "../../components/profile/Profile";
import { useIdentity } from "../../hooks/api/auth/identity";

export const Route = new FileRoute("/profile").createRoute({
  component: withAuthenticationRequired(ProfileRouteComponent),
});

export function ProfileRouteComponent() {
  const { user, isLoading } = useAuth0();
  const { data: userMetadata = null } = useIdentity();

  const isUserDataReady = (user?: User): user is User => {
    return isLoading === false && user !== undefined;
  };

  if (!isUserDataReady(user)) {
    return <div>User data is loading</div>;
  }

  return <Profile user={user} userMetadata={userMetadata} />;
}
