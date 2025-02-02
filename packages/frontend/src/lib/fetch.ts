const baseURL = import.meta.env.VITE_API_URL;

export const customInstance = async <T>({
  url,
  method,
  params,
  data,
  headers,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: any;
  data?: any;
  headers?: RequestInit["headers"];
  responseType?: string;
  signal?: AbortSignal;
}): Promise<T> => {
  let targetUrl = `${baseURL}${url}`;

  if (params) {
    targetUrl += `?${new URLSearchParams(params)}`;
  }

  const response = await fetch(targetUrl, {
    method,
    headers,
    ...(data ? { body: JSON.stringify(data) } : {}),
  });

  return response.json();
};

export default customInstance;
