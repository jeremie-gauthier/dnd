import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: import.meta.env.VITE_AUTH0_LOGOUT_REDIRECT_URI,
          },
        })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
