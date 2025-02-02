/**
 * Generated by orval v7.4.1 🍺
 * Do not edit manually.
 * DnD
 * The DnD API description
 * OpenAPI spec version: 1.0
 */
import { useQuery } from "@tanstack/react-query";
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { customInstance } from "../../../../lib/fetch";
import type { GetUserOutputDto } from "../../model";

export const userPrivateControllerGetUser = (
  userId: string,
  signal?: AbortSignal,
) => {
  return customInstance<GetUserOutputDto>({
    url: `/user/private/get-user/${userId}`,
    method: "GET",
    signal,
  });
};

export const getUserPrivateControllerGetUserQueryKey = (userId: string) => {
  return [`/user/private/get-user/${userId}`] as const;
};

export const getUserPrivateControllerGetUserQueryOptions = <
  TData = Awaited<ReturnType<typeof userPrivateControllerGetUser>>,
  TError = unknown,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof userPrivateControllerGetUser>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getUserPrivateControllerGetUserQueryKey(userId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof userPrivateControllerGetUser>>
  > = ({ signal }) => userPrivateControllerGetUser(userId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!userId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof userPrivateControllerGetUser>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> };
};

export type UserPrivateControllerGetUserQueryResult = NonNullable<
  Awaited<ReturnType<typeof userPrivateControllerGetUser>>
>;
export type UserPrivateControllerGetUserQueryError = unknown;

export function useUserPrivateControllerGetUser<
  TData = Awaited<ReturnType<typeof userPrivateControllerGetUser>>,
  TError = unknown,
>(
  userId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof userPrivateControllerGetUser>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof userPrivateControllerGetUser>>,
          TError,
          TData
        >,
        "initialData"
      >;
  },
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>;
};
export function useUserPrivateControllerGetUser<
  TData = Awaited<ReturnType<typeof userPrivateControllerGetUser>>,
  TError = unknown,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof userPrivateControllerGetUser>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof userPrivateControllerGetUser>>,
          TError,
          TData
        >,
        "initialData"
      >;
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };
export function useUserPrivateControllerGetUser<
  TData = Awaited<ReturnType<typeof userPrivateControllerGetUser>>,
  TError = unknown,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof userPrivateControllerGetUser>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

export function useUserPrivateControllerGetUser<
  TData = Awaited<ReturnType<typeof userPrivateControllerGetUser>>,
  TError = unknown,
>(
  userId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof userPrivateControllerGetUser>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getUserPrivateControllerGetUserQueryOptions(
    userId,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}
