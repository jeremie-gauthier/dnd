import { useAuth0 } from '@auth0/auth0-react';
import { getLobbiesOutputSchema } from '@dnd/shared';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { fetcherWithAuth } from '../../../config/fetcher';

export type GetLobbiesResponse = z.infer<typeof getLobbiesOutputSchema>;

export const useGetLobbies = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ['lobbies'],
    queryFn: () =>
      fetcherWithAuth<GetLobbiesResponse>(
        `http://localhost:3000/lobby/private/get-lobbies`,
        getAccessTokenSilently,
      ),
  });
};
