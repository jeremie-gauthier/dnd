import { FileRoute, redirect } from '@tanstack/react-router';
import { auth } from '../../contexts/auth.context';

export const Route = new FileRoute('/_auth').createRoute({
  beforeLoad: ({ context, location }) => {
    // If the user is logged out, redirect them to the login page
    if (context.auth.status === 'loggedOut') {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }

    // Otherwise, return the user in context
    return {
      user: auth.user,
    };
  },
});
