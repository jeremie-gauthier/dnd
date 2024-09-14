import { useAuth0 } from "@auth0/auth0-react";
import { fetcherWithAuth } from "@config/fetcher";
import { GetHeroDetailsOutput } from "@dnd/shared";
import { useQuery } from "@tanstack/react-query";

export const useGetHeroDetails = ({ heroId }: { heroId: string }) => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ["hero", heroId],
    queryFn: () =>
      fetcherWithAuth<GetHeroDetailsOutput>(
        `http://localhost:3000/campaign/private/get-hero-details/${heroId}`,
        getAccessTokenSilently,
      ),
    enabled: !!heroId,
  });
};
