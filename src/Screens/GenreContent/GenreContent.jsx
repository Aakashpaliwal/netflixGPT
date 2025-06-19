import { getContentByGenre } from "@/API/TmdbApi";
import MovieCard from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation, useParams } from "react-router-dom";

const GenreContent = () => {
  const { type, genreId } = useParams();
  const location = useLocation();
  console.log(location);
  console.log(type, genreId);

  const { data, isPending, error } = useQuery({
    queryKey: ["genreContent", type, genreId],
    queryFn: () => getContentByGenre(type, genreId),
    enabled: !!type && !!genreId,
    refetchOnWindowFocus: false,
  });

  console.log(data);
  console.log(error);

  return (
    <div className="min-h-screen m-3">
      <h2 className="text-xl font-bold mb-7 capitalize">
        {type} Genre: {location?.state?.genreName?.name}
      </h2>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {isPending && (
          <>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-[340px] w-[230px] rounded-xl" />
            ))}
          </>
        )}
        {data?.data?.results?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {/* <MovieCard movie={data?.data?.results?.[0]}/> */}
    </div>
  );
};

export default GenreContent;
