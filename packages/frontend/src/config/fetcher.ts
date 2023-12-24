import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export const fetcher = async (
  url: string,
  token: string,
  params?: Omit<RequestInit, 'headers' | 'method'>,
) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...params,
  });

  const data = await response.json();

  return data;
};
