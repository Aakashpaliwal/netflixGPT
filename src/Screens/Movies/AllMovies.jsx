import React from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  getTrendMovie, 
  getPopularMovies, 
  getTopRatedMovies, 
  getNowPlayingMovies,
  getUpcomingMovies 
} from "@/API/TmdbApi";
import MovieCarousel from "@/components/MovieCarousel";
import Header from "@/Screens/Header/Header";

const AllMovies = () => {
  // Trending Movies
  const { 
    data: trendingMovies, 
    isPending: trendingLoading, 
    error: trendingError 
  } = useQuery({
    queryKey: ["trendMovies"],
    queryFn: getTrendMovie,
    refetchOnWindowFocus: false,
  });

  // Popular Movies
  const { 
    data: popularMovies, 
    isPending: popularLoading, 
    error: popularError 
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: getPopularMovies,
    refetchOnWindowFocus: false,
  });

  // Top Rated Movies
  const { 
    data: topRatedMovies, 
    isPending: topRatedLoading, 
    error: topRatedError 
  } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: getTopRatedMovies,
    refetchOnWindowFocus: false,
  });

  // Now Playing Movies
  const { 
    data: nowPlayingMovies, 
    isPending: nowPlayingLoading, 
    error: nowPlayingError 
  } = useQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: getNowPlayingMovies,
    refetchOnWindowFocus: false,
  });

  // Upcoming Movies
  const { 
    data: upcomingMovies, 
    isPending: upcomingLoading, 
    error: upcomingError 
  } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: getUpcomingMovies,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Header />
      <div className="min-h-screen ">
        <div className="pt-20">
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
