import { getMovieVideo } from "@/API/TmdbApi";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const VideoContainer = ({ id, title, description }) => {
  const [filterData, setFilterData] = useState(null);

  const { data } = useQuery({
    queryKey: ["movieVid", id],
    queryFn: () => getMovieVideo(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.data?.results.length) {
      const trailer = data.data.results.find(
        (item) =>
          item?.type === "Trailer" &&
          item?.site === "YouTube" &&
          item?.name === "Official Trailer"
      );
      setFilterData(trailer);
    }
  }, [data]);

  return (
    <div className="relative w-full h-[56.25vw] max-h-screen overflow-hidden">
      {/* Video Background */}
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${
          filterData?.key || "hXzcyx9V0xw"
        }?autoplay=1&mute=1&controls=0&loop=1&playlist=${
          filterData?.key || "hXzcyx9V0xw"
        }`}
        title="Trailer"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      ></iframe>
        {/* <iframe
          className="absolute top-0 left-0 w-full h-full aspect-auto"
          src="https://www.youtube.com/embed/hXzcyx9V0xw?si=zITgzjdmEbLZFxV2&autoplay=1&mute=1&controls=0&loop=1"
          title="YouTube video player"
          frameborder="0"
          allow="autoplay; fullscreen"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe> */}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/90"></div>

      {/* Text Overlay (Hidden on mobile) */}
      <div className="absolute inset-0 z-10 hidden sm:flex items-center px-6 md:px-12">
        <div className="text-white">
          <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
          <p className="max-w-xl mt-4 text-sm md:text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoContainer;
