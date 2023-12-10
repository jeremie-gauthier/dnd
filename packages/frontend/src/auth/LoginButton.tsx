import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            redirect_uri: import.meta.env.VITE_AUTH0_LOGIN_REDIRECT_URI,
          },
        })
      }
    >
      Log In
    </button>
  );
};

export default LoginButton;
