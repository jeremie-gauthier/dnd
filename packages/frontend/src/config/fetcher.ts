import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const fetcherWithAuth = async <Data>(
  url: string,
  tokenGetter: () => Promise<string | undefined>,
  params?: Omit<RequestInit, "headers" | "method">,
): Promise<Data> => {
  const token = await tokenGetter();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...params,
  });

  const data = await response.json();

  return data;
};
