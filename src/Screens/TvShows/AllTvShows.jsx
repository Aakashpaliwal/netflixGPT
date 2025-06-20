import {
  getAiringTodayTvshows,
  getonTheAirTvshows,
  getPopularTvshows,
  getTopRatedTvshows,
  getTredningTvshows,
  getTvGenres,
} from "@/API/TmdbApi";
import MovieCarousel from "@/components/MovieCarousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";

const AllTvShows = () => {
    const navigate = useNavigate()

  // Trending Tv Shows
  const {
    data: trendingTvShows,
    isPending: trendingLoading,
    error: trendingError,
  } = useQuery({
    queryKey: ["trendtv"],
    queryFn: getTredningTvshows,
    refetchOnWindowFocus: false,
  });

  // Popular Movies
  const {
    data: popularTv,
    isPending: popularLoading,
    error: popularError,
  } = useQuery({
    queryKey: ["populartv"],
    queryFn: getPopularTvshows,
    refetchOnWindowFocus: false,
  });

  // Airing Today Movies
  const {
    data: airingTodayTv,
    isPending: airingTodayLoading,
    error: airingTodayError,
  } = useQuery({
    queryKey: ["airingTodaytv"],
    queryFn: getAiringTodayTvshows,
    refetchOnWindowFocus: false,
  });

  // On The Air Movies
  const {
    data: onTheAirTv,
    isPending: onTheAirLoading,
    error: onTheAirError,
  } = useQuery({
    queryKey: ["onTheAirtv"],
    queryFn: getonTheAirTvshows,
    refetchOnWindowFocus: false,
  });

  // top rated Movies
  const {
    data: topRatedTv,
    isPending: topRatedLoading,
    error: topRatedError,
  } = useQuery({
    queryKey: ["topRatedtv"],
    queryFn: getTopRatedTvshows,
    refetchOnWindowFocus: false,
  });

  const {
    data: genreData,
    isPending: genrePending,
    error: genreError,
  } = useQuery({
    queryKey: ["tvGenre"],
    queryFn: getTvGenres,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="min-h-screen ">
      <div className="pt-6 m-3">
        {genreData && (
          <div className="pl-8">
            <Select
              onValueChange={(genreId) => {
                const selectedGenreName = genreData?.data?.genres.find(
                  (genre) => genre.id == genreId
                );
                navigate(`/genre/tv/${genreId}`, {
                  state: {
                    genreName: selectedGenreName,
                  },
                });
              }}
              className="border-0"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Genres" />
              </SelectTrigger>
              <SelectContent className={"border-gray-300"}>
                {genreData?.data?.genres.map((item) => {
                  return (
                    <>
                      <SelectItem value={item?.id} key={item?.id}>
                        {item?.name}
                      </SelectItem>
                    </>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}
        <MovieCarousel
          title="Trending TV Shows"
          data={trendingTvShows}
          loading={trendingLoading}
          error={trendingError}
          type='tv'
        />

        <MovieCarousel
          title="Airing Today TV Shows"
          data={airingTodayTv}
          loading={airingTodayLoading}
          error={airingTodayError}
          type='tv'
        />

        <MovieCarousel
          title="Popular TV Shows"
          data={popularTv}
          loading={popularLoading}
          error={popularError}
          type='tv'
        />

        <MovieCarousel
          title="On The Air TV Shows"
          data={onTheAirTv}
          loading={onTheAirLoading}
          error={onTheAirError}
          type='tv'
        />

        <MovieCarousel
          title="Top Rated TV Shows"
          data={topRatedTv}
          loading={topRatedLoading}
          error={topRatedError}
          type='tv'
        />
      </div>
    </div>
  );
};

export default AllTvShows;
