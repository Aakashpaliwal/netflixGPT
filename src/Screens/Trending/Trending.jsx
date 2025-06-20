import React from "react";
import MovieCarousel from "@/components/MovieCarousel";

const Trending = ({ data, loading, error }) => {
  return (
    <MovieCarousel
      title="Trending Movies"
      data={data}
      loading={loading}
      error={error}
      type='movie'
    />
  );
};

export default Trending;
