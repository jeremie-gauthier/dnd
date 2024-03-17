import { useAuth0 } from "@auth0/auth0-react";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

export const useAuthenticatedQuery = <
  TQueryKey extends [string, Record<string, unknown>?],
  TQueryFnData,
  TError,
  TData = TQueryFnData,
>(
  queryKey: TQueryKey,
  fetcher: (token: string, params?: TQueryKey[1]) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently();
      return await fetcher(accessToken, queryKey[1]);
    },
    ...options,
  });
};
