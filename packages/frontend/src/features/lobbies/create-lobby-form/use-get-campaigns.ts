import { useAuth0 } from "@auth0/auth0-react";
import { fetcherWithAuth } from "@config/fetcher";
import { useQuery } from "@tanstack/react-query";

export type GetCampaignsResponse = {
  id: string;
  title: string;
  status: "AVAILABLE" | "COMING_SOON" | "DISABLED";
  currentStage: {
    id: string;
    order: number;
    title: string;
    status: "AVAILABLE" | "COMING_SOON" | "DISABLED";
  };
  nbStages: number;
}[];

export const useGetCampaigns = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ["campaigns"],
    queryFn: () =>
      fetcherWithAuth<GetCampaignsResponse>(
        "http://localhost:3000/campaign/private/get-campaigns",
        getAccessTokenSilently,
      ),
  });
};
