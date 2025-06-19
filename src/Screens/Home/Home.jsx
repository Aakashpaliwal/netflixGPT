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
import VideoContainer from "@/Screens/Home/VideoContainer";

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

  console.log(data);

  return (
    <>
      <div className="min-h-screen">
        {data && (
          <VideoContainer
            id={data?.data?.results?.[5]?.id}
            title={data?.data?.results?.[5]?.original_title}
            description={data?.data?.results?.[5]?.overview}
          />
        )}
        {/* <div className="lg:-mt-50 md:-mt-30 relative z-20 px-4 md:px-8"> */}
          <Trending data={data} loading={isPending} error={error} />
        {/* </div> */}
        <TvShows
          data={trendingShow}
          loading={tvShowPending}
          error={tvShowError}
        />
      </div>
    </>
  );
};

export default Home;
