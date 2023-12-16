import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      authorizationParams: {
        redirect_uri: import.meta.env.VITE_AUTH0_LOGIN_REDIRECT_URI,
      },
    });
  };

  return <button onClick={handleLogin}>Log In</button>;
};

export default LoginButton;
