import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getTrendMovie,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getGenres,
} from "@/API/TmdbApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MovieCarousel from "@/components/MovieCarousel";
import { useNavigate } from "react-router-dom";

const AllMovies = () => {
  const navigate = useNavigate();

  // Trending Movies
  const {
    data: trendingMovies,
    isPending: trendingLoading,
    error: trendingError,
  } = useQuery({
    queryKey: ["trendMovies"],
    queryFn: getTrendMovie,
    refetchOnWindowFocus: false,
  });

  // Popular Movies
  const {
    data: popularMovies,
    isPending: popularLoading,
    error: popularError,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: getPopularMovies,
    refetchOnWindowFocus: false,
  });

  // Top Rated Movies
  const {
    data: topRatedMovies,
    isPending: topRatedLoading,
    error: topRatedError,
  } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: getTopRatedMovies,
    refetchOnWindowFocus: false,
  });

  // Now Playing Movies
  const {
    data: nowPlayingMovies,
    isPending: nowPlayingLoading,
    error: nowPlayingError,
  } = useQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: getNowPlayingMovies,
    refetchOnWindowFocus: false,
  });

  // Upcoming Movies
  const {
    data: upcomingMovies,
    isPending: upcomingLoading,
    error: upcomingError,
  } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: getUpcomingMovies,
    refetchOnWindowFocus: false,
  });

  const {
    data: genreData,
    isPending: genrePending,
    error: genreError,
  } = useQuery({
    queryKey: ["movieGenre"],
    queryFn: getGenres,
    refetchOnWindowFocus: false,
  });

  console.log(genreData);

  return (
    <>
      <div className="min-h-screen ">
        <div className="pt-6 m-3">
          {genreData && (
            <div className="pl-8">
              <Select
                onValueChange={(genreId) => {
                  const selectedGenreName = genreData?.data?.genres.find((genre) => genre.id == genreId)
                  console.log(selectedGenreName)
                  navigate(`/genre/movie/${genreId}`, {
                    state: {
                      genreName: selectedGenreName
                    }
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
            title="Trending Movies"
            data={trendingMovies}
            loading={trendingLoading}
            error={trendingError}
          />

          <MovieCarousel
            title="Popular Movies"
            data={popularMovies}
            loading={popularLoading}
            error={popularError}
          />

          <MovieCarousel
            title="Top Rated Movies"
            data={topRatedMovies}
            loading={topRatedLoading}
            error={topRatedError}
          />

          <MovieCarousel
            title="Now Playing"
            data={nowPlayingMovies}
            loading={nowPlayingLoading}
            error={nowPlayingError}
          />

          <MovieCarousel
            title="Upcoming Movies"
            data={upcomingMovies}
            loading={upcomingLoading}
            error={upcomingError}
          />
        </div>
      </div>
    </>
  );
};

export default AllMovies;
