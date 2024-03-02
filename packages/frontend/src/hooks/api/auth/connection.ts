import { useAuth0 } from "@auth0/auth0-react";
import { fetcherWithAuth } from "../../../config/fetcher";

type ConnectionResponse = "Ok";

export const useConnection = () => {
  const { getAccessTokenSilently } = useAuth0();

  return () =>
    fetcherWithAuth<ConnectionResponse>(
      "http://localhost:3000/auth/private/connection",
      getAccessTokenSilently,
    );
};
