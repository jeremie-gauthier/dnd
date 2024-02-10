import { useAuth0 } from '@auth0/auth0-react';
import { FileRoute, useRouter } from '@tanstack/react-router';
import * as React from 'react';
import { z } from 'zod';
import LoginButton from '../../components/auth/LoginButton';
import LogoutButton from '../../components/auth/LogoutButton';
import { useConnection } from '../../hooks/api/auth/connection';

export const Route = new FileRoute('/login')
  .createRoute({
    validateSearch: z.object({
      redirect: z.string().optional(),
    }),
  })
  .update({
    component: LoginComponent,
  });

function LoginComponent() {
  const router = useRouter();
  const search = Route.useSearch();
  const { isAuthenticated, user, logout } = useAuth0();
  const connection = useConnection();

  React.useLayoutEffect(() => {
    if (isAuthenticated) {
      router.invalidate();
      connection();

      if (search.redirect) {
        router.history.push(search.redirect);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, search.redirect]);

  return isAuthenticated && user ? (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>

      <LogoutButton
        afterLogout={() => {
          logout();
          router.invalidate();
        }}
      />
    </div>
  ) : (
    <div>
      <div>You must log in!</div>
      <LoginButton />
    </div>
  );
}
