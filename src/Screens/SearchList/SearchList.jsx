import MovieCard from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import useSearchTmdb from "@/hooks/useSearchTmdb";
import React from "react";
import { useParams } from "react-router-dom";

const SearchList = () => {
  const { searchTerm } = useParams();
  console.log(searchTerm);

  const { searchedData, searchPending, searchError } = useSearchTmdb(
    searchTerm,
    1000
  );

  console.log(searchedData);
  console.log(searchError);

  return (
    <div className="min-h-screen m-3">
      <h2 className="text-xl font-bold mb-7 capitalize">
        {searchTerm}
      </h2>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {searchPending && (
          <>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-[340px] w-[230px] rounded-xl" />
            ))}
          </>
        )}
        {searchedData?.data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchList;
