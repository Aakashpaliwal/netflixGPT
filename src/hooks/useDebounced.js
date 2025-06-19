import { getSearchedContent } from "@/API/TmdbApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value]);

  const {
    data: searchedData,
    isPending: searchPending,
    error: searchError,
  } = useQuery({
    queryKey: ["searchContent", debouncedValue],
    queryFn: () => getSearchedContent(debouncedValue),
    enabled: !!debouncedValue,
    refetchOnWindowFocus: false,
  });

  return { searchedData, searchPending, searchError };
}
export default useDebounce;
