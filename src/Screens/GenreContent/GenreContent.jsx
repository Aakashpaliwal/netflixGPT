import { getContentByGenre } from "@/API/TmdbApi";
import MovieCard from "@/components/MovieCard";
import Button from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const GenreContent = () => {
  const { type, genreId } = useParams();
  const location = useLocation();

  const loadMoreRef  = useRef(null)

  const {
    data,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["genreContent", type, genreId],
    queryFn: ({ pageParam = 1 }) => getContentByGenre(type, genreId, pageParam),
    enabled: !!type && !!genreId,
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const currentPage = lastPage?.data?.page;
      const totalPages = lastPage?.data?.total_pages;
      if (currentPage < totalPages) {
        return currentPage + 1;
      }
      return undefined;
    },
  });

  // const handleScroll = () => {
  //   const bottom =
  //     Math.ceil(window.innerHeight + window.scrollY) >=
  //     document.documentElement.scrollHeight - 200;
  //   console.log(bottom);
  //   if (bottom) {
  //     fetchNextPage();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    if(!loadMoreRef.current) return

    const observe = new IntersectionObserver((entries) => {
      const [entry] = entries
      if(entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }, {
      root: null,
      rootMargin :'0px',
      threshold: 1
    })

    observe.observe(loadMoreRef.current)

    return () => {
      if(loadMoreRef.current) observe.unobserve(loadMoreRef.current)
    }

  },[hasNextPage, fetchNextPage, isFetchingNextPage])


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
        {data?.pages?.flatMap((item) => {
          return item.data.results.map((genreData) => {
            return <MovieCard key={genreData.id} movie={genreData} id={genreData.id} type={type} />;
          });
        })}
      </div>
      <div ref={loadMoreRef} className="mt-6 flex w-full justify-center items-center">
        {isFetchingNextPage && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default GenreContent;
