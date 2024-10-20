import { useAuth0 } from "@auth0/auth0-react";
import { GetUserOutput } from "@dnd/shared";
import { fetcherWithAuth } from "@lib/react-query";
import { useQuery } from "@tanstack/react-query";

export const useUser = (userId?: string) => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      fetcherWithAuth<GetUserOutput>(
        `http://localhost:3000/user/private/get-user/${userId}`,
        getAccessTokenSilently,
      ),
    enabled: !!userId,
  });
};
