import { FileRoute } from '@tanstack/react-router';
import Profile from '../../components/profile/Profile';
import { useIdentity } from '../../hooks/api/identity';

export const Route = new FileRoute('/_auth/profile').createRoute({
  component: ProfileRouteComponent,
});

export function ProfileRouteComponent() {
  const { auth } = Route.useRouteContext();
  const { data: userMetadata = null } = useIdentity();

  return <Profile user={auth.user!} userMetadata={userMetadata} />;
}
