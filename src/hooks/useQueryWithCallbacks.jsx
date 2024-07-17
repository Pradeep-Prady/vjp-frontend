import { useEffect } from "react";
import { useQuery } from "react-query";

const useQueryWithCallbacks = (options) => {
  const result = useQuery(options);

  useEffect(() => {
    if (result.isSuccess && options?.onSuccess) {
      options.onSuccess(result.data);
    }
  }, [result, options]);

  useEffect(() => {
    if (result.isError && options?.onError) {
      options.onError(result.error);
    }
  }, [result, options]);

  return result;
};

export const useQueryEvents = (query, callbacks) => {
  const { onSuccess, onError } = callbacks;

  useEffect(() => {
    if (query.data && onSuccess) {
      onSuccess(query.data);
    }
  }, [query.data, onSuccess]);

  useEffect(() => {
    if (query.error && onError) {
      onError(query.error);
    }
  }, [query.error, onError]);

  return query;
};

export default useQueryWithCallbacks;
