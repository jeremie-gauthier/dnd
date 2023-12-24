import { FileRoute } from '@tanstack/react-router';
import Profile from '../../components/profile/Profile';

export const Route = new FileRoute('/_auth/profile').createRoute({
  component: ProfileRouteComponent,
});

export function ProfileRouteComponent() {
  const { auth } = Route.useRouteContext();

  return <Profile user={auth.user!} />;
}
