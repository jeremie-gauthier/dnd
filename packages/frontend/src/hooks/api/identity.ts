import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from '@tanstack/react-query';
import { fetcherWithAuth } from '../../config/fetcher';

type IdentityResponse = {
  id: string;
};

export const useIdentity = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey: ['identity'],
    queryFn: () =>
      fetcherWithAuth<IdentityResponse>(
        'http://localhost:3000/auth/private',
        getAccessTokenSilently,
      ),
  });
};
