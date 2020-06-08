import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useAuthDataApi = (
  initialUrl: string,
  initialData: null,
  onError?: () => void
) => {
  const [data, setData] = useState<any>(initialData);
  const [url, setUrl] = useState(initialUrl); // Mechanism to refetch by changing url
  const [hash, setHash] = useState<any>(null); // Mechanism to refrech same url, by changing hash
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { authToken, renewToken, setAuthAndRenewToken } = useAuth();
  const authOptions = useMemo(
    () => ({
      headers: {
        Authorization: authToken,
      },
    }),
    [authToken]
  );
  const renewOptions = useMemo(
    () => ({
      headers: {
        Authorization: renewToken,
      },
    }),
    [renewToken]
  );

  const intercept_error = useCallback(
    (error: any) => {
      const originalRequest = error.config;
      const renewUrl = "/be/api/v1/session/renew";
      if (
        originalRequest._retry ||
        (error.response != null &&
          error.response.status != null &&
          error.response.status !== 401) ||
        originalRequest.url === renewUrl ||
        renewOptions.headers.Authorization == null
      ) {
        return Promise.reject(error);
      }

      // Interceptor doing work (Trying to renew)

      originalRequest._retry = true;
      return axios
        .post(renewUrl, null, renewOptions)
        .then((res) => {
          if (res.status === 200) {
            setAuthAndRenewToken(
              res.data.data.token,
              res.data.data.renew_token
            );

            // Modify the original request if possible
            if (
              originalRequest.headers != null &&
              originalRequest.headers.Authorization != null
            ) {
              originalRequest.headers.Authorization = res.data.data.token;
            }
            return axios(originalRequest);
          }
        })
        .catch((e) => {
          if (onError != null) {
            onError();
          }
          // Interceptor error after renew
        });
    },
    [onError, renewOptions, setAuthAndRenewToken]
  );

  useEffect(() => {
    const fetchData = async () => {
      // Do not request if we don't have auth tokens loaded
      // Also, clear data (Unsure about this, but needed for the logout
      // button to clear the ProfileProvider context)
      if (authOptions.headers.Authorization == null) {
        setData(initialData);
        return;
      }

      const id = (response: any) => response;
      setIsError(false);
      setIsLoading(true);

      const an_axios = axios.create();
      an_axios.interceptors.response.use(id, intercept_error);
      try {
        const result = await an_axios(url, authOptions);
        if (result != null) {
          setData(result.data);
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url, hash, authOptions, intercept_error, initialData]);
  return {
    data,
    isLoading,
    isError,
    doFetchUrl: setUrl,
    doFetchHash: setHash,
    setData, // Override what was fetched by the API (For example, websocket updates)
  };
};

export default useAuthDataApi;
