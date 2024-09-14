import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${import.meta.env.VITE_AUTH0_LOGIN_REDIRECT_URI}${
          window.location.search
        }`,
      },
    });
  };

  return (
    <button type="submit" onClick={handleLogin}>
      Log In
    </button>
  );
};
