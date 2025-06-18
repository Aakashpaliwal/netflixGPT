import React from "react";
import MovieCarousel from "@/components/MovieCarousel";

const TvShows = ({ data, loading, error }) => {
  return (
    <MovieCarousel
      title="Trending TV Shows"
      data={data}
      loading={loading}
      error={error}
    />
  );
};

export default TvShows;
