import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "@tanstack/react-router";
import { fetcherWithAuth } from "../../../config/fetcher";

type ConnectionResponse = "Ok";

export const useConnection = () => {
  const router = useRouter();
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

  const tokenGetter = async () => {
    try {
      const token = await getAccessTokenSilently();
      return token;
    } catch (error) {
      await loginWithRedirect({
        appState: {
          // TODO?: url is as expected but app renders the "/" page
          returnTo: router.latestLocation.href,
        },
      });
    }
  };

  return () =>
    fetcherWithAuth<ConnectionResponse>(
      "http://localhost:3000/auth/private/connection",
      tokenGetter,
    );
};
