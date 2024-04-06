import { useAuth0 } from "@auth0/auth0-react";
import { PrivateGetUserOutput } from "@dnd/shared";
import { useQuery } from "@tanstack/react-query";
import { fetcherWithAuth } from "../../../config/fetcher";

export const useUser = (userId: string) => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      fetcherWithAuth<PrivateGetUserOutput>(
        `http://localhost:3000/user/private/get-user/${userId}`,
        getAccessTokenSilently,
      ),
    // refetchOnWindowFocus: false,
    // refetchOnMount: false
  });
};
