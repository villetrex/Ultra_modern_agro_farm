import useSWR from "swr";
import axios from "axios";
import { useMemo } from "react";

export default function useRequest(request, { initialData, ...config } = {}) {
  const { data: response, error, isValidating, revalidate, mutate } = useSWR(
    request && JSON.stringify(request),
    () => axios(request || {}),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: "InitialData",
        headers: initialData.headers ? { ...initialData.headers } : {},
        data: initialData,
      },
    }
  );

  return useMemo(
    () => ({
      data: response && response.data,
      response,
      error,
      isValidating,
      revalidate,
      mutate,
    }),
    [response, error, isValidating, revalidate, mutate]
  );
}
