import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { getTrendMovie, getTrendShows } from "@/API/TmdbApi";
import Trending from "@/Screens/Trending/Trending";
import TvShows from "@/Screens/Trending/TvShows";

const Home = () => {
  console.log("homew");
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["trendMovies"],
    queryFn: getTrendMovie,
    refetchOnWindowFocus: false,
  });

  const {
    data: trendingShow,
    error: tvShowError,
    isPending: tvShowPending,
  } = useQuery({
    queryKey: ["trendingShows"],
    queryFn: getTrendShows,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <div className="min-h-screen">
        <div className="pt-20">
          <Trending data={data} loading={isPending} error={error} />
          <TvShows
            data={trendingShow}
            loading={tvShowPending}
            error={tvShowError}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
