import { useState, useCallback } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const useApiCalls = <T = any>() => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = "http://localhost:8000/api";

  const request = useCallback(
    async (
      endpoint: string,
      method: HttpMethod = "GET",
      body?: unknown,
      options: RequestOptions = {}
    ): Promise<T> => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(baseUrl + endpoint, {
          method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
          },
          body: body ? JSON.stringify(body) : null,
          ...options,
        });

        if (!response.ok) {
          console.log("error in api: ", response)
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result: T = await response.json();
        console.log("Api response: ", result)
        setData(result);
        return result;
      } catch (err: any) {
        console.log("error in api: ", err)
        const message = err?.message || "Something went wrong";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  // convenience methods
  const get = useCallback(
    (endpoint: string, options?: RequestOptions) =>
      request(endpoint, "GET", undefined, options),
    [request]
  );

  const post = useCallback(
    (endpoint: string, body?: unknown, options?: RequestOptions) =>
      request(endpoint, "POST", body, options),
    [request]
  );

  const put = useCallback(
    (endpoint: string, body?: unknown, options?: RequestOptions) =>
      request(endpoint, "PUT", body, options),
    [request]
  );

  const del = useCallback(
    (endpoint: string, options?: RequestOptions) =>
      request(endpoint, "DELETE", undefined, options),
    [request]
  );

  return { data, loading, error, get, post, put, del };
};
