import { queryOptions } from '@tanstack/react-query';
import { FileRoute } from '@tanstack/react-router';
import Profile from '../../components/profile/Profile';
import { fetchIdentityFn } from '../../hooks/api/identity';

const identityFnQueryOptions = () =>
  queryOptions({
    queryKey: ['identity'],
    queryFn: () => fetchIdentityFn,
  });

export const Route = new FileRoute('/_auth/profile').createRoute({
  loader: (opts) => opts.context.queryClient.ensureQueryData(identityFnQueryOptions()),
  component: ProfileRouteComponent,
});

export function ProfileRouteComponent() {
  const { auth } = Route.useRouteContext();

  const userMetadata = null;

  return <Profile user={auth.user!} userMetadata={userMetadata} />;
}
