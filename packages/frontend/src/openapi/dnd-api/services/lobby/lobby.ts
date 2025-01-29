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
import type { GetLobbiesOutputDto, GetLobbyOutputDto } from "../../model";

export const lobbyPrivateControllerGetLobbies = (signal?: AbortSignal) => {
  return customInstance<GetLobbiesOutputDto>({
    url: "/lobby/private/get-lobbies",
    method: "GET",
    signal,
  });
};

export const getLobbyPrivateControllerGetLobbiesQueryKey = () => {
  return ["/lobby/private/get-lobbies"] as const;
};

export const getLobbyPrivateControllerGetLobbiesQueryOptions = <
  TData = Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>,
      TError,
      TData
    >
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getLobbyPrivateControllerGetLobbiesQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>
  > = ({ signal }) => lobbyPrivateControllerGetLobbies(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> };
};

export type LobbyPrivateControllerGetLobbiesQueryResult = NonNullable<
  Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>
>;
export type LobbyPrivateControllerGetLobbiesQueryError = unknown;

export function useLobbyPrivateControllerGetLobbies<
  TData = Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>,
  TError = unknown,
>(options: {
  query: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>,
      TError,
      TData
    >
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>,
        TError,
        TData
      >,
      "initialData"
    >;
}): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>;
};
export function useLobbyPrivateControllerGetLobbies<
  TData = Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>,
      TError,
      TData
    >
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>,
        TError,
        TData
      >,
      "initialData"
    >;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };
export function useLobbyPrivateControllerGetLobbies<
  TData = Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>,
      TError,
      TData
    >
  >;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

export function useLobbyPrivateControllerGetLobbies<
  TData = Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof lobbyPrivateControllerGetLobbies>>,
      TError,
      TData
    >
  >;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getLobbyPrivateControllerGetLobbiesQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

export const lobbyPrivateControllerGetLobby = (
  lobbyId: string,
  signal?: AbortSignal,
) => {
  return customInstance<GetLobbyOutputDto>({
    url: `/lobby/private/get-lobby/${lobbyId}`,
    method: "GET",
    signal,
  });
};

export const getLobbyPrivateControllerGetLobbyQueryKey = (lobbyId: string) => {
  return [`/lobby/private/get-lobby/${lobbyId}`] as const;
};

export const getLobbyPrivateControllerGetLobbyQueryOptions = <
  TData = Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>,
  TError = unknown,
>(
  lobbyId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getLobbyPrivateControllerGetLobbyQueryKey(lobbyId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>
  > = ({ signal }) => lobbyPrivateControllerGetLobby(lobbyId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!lobbyId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>,
    TError,
    TData
  > & { queryKey: DataTag<QueryKey, TData> };
};

export type LobbyPrivateControllerGetLobbyQueryResult = NonNullable<
  Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>
>;
export type LobbyPrivateControllerGetLobbyQueryError = unknown;

export function useLobbyPrivateControllerGetLobby<
  TData = Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>,
  TError = unknown,
>(
  lobbyId: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>,
          TError,
          TData
        >,
        "initialData"
      >;
  },
): DefinedUseQueryResult<TData, TError> & {
  queryKey: DataTag<QueryKey, TData>;
};
export function useLobbyPrivateControllerGetLobby<
  TData = Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>,
  TError = unknown,
>(
  lobbyId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>,
          TError,
          TData
        >,
        "initialData"
      >;
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };
export function useLobbyPrivateControllerGetLobby<
  TData = Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>,
  TError = unknown,
>(
  lobbyId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

export function useLobbyPrivateControllerGetLobby<
  TData = Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>,
  TError = unknown,
>(
  lobbyId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof lobbyPrivateControllerGetLobby>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {
  const queryOptions = getLobbyPrivateControllerGetLobbyQueryOptions(
    lobbyId,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: DataTag<QueryKey, TData>;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}
