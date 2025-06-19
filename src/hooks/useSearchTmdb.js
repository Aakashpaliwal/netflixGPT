import { getSearchedContent } from "@/API/TmdbApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function useSearchTmdb (value, delay) {
 const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

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

export default useSearchTmdb