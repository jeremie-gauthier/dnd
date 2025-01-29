const baseURL = process.env.VITE_API_URL;

export const customInstance = async <T>({
  url,
  method,
  params,
  data,
  signal,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: any;
  data?: any;
  responseType?: string;
  signal?: AbortSignal;
}): Promise<T> => {
  let targetUrl = `${baseURL}${url}`;

  if (params) {
    targetUrl += `?${new URLSearchParams(params)}`;
  }

  const response = await fetch(targetUrl, {
    method,
    ...(data ? { body: JSON.stringify(data) } : {}),
  });

  return response.json();
};

export default customInstance;
