import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { fetcherWithAuth } from '../../../config/fetcher';

export type GetLobbyResponse = {
  id: string;
  order: number;
  title: string;
  status: 'AVAILABLE' | 'COMING_SOON' | 'DISABLED';
  campaign: {
    id: string;
    title: string;
    status: 'AVAILABLE' | 'COMING_SOON' | 'DISABLED';
    nbStages: number;
  };
};

export const useGetLobby = (stageId: string) => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ['campaigns'],
    queryFn: () =>
      fetcherWithAuth<GetLobbyResponse>(
        `http://localhost:3000/campaign/private/get-campaign-stage/${stageId}`,
        getAccessTokenSilently,
      ),
  });
};

export const MOCK_HEROES = [
  { id: '1', name: 'Redgar' },
  { id: '2', name: 'Josuan' },
];
