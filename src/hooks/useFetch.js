import { useEffect, useState } from 'react';

export const useFetch = (fetchingFunction) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchingFunction()
      .then((data) => {
        setData(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchingFunction]);
  return {
    data,
    hasError,
    isLoading,
  };
};
