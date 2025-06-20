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
    <>
      {/* <div className="relative w-full h-[56.25vw] max-h-screen overflow-hidden"> */}
       <div className="w-full h-[56.25vw] max-h-screen relative overflow-hidden">
       <iframe
        className="w-screen aspect-video"
          src={`https://www.youtube.com/embed/${
          filterData?.key || "hXzcyx9V0xw"
        }?autoplay=1&mute=1&controls=0&loop=1`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>

      
      <div className="absolute inset-0 z-20 hidden sm:flex items-center justify-start pl-8 bg-gradient-to-r from-black/80">
        <div className="text-white max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
          <p className="mt-4 text-sm md:text-base">{description}</p>
        </div>
      </div>
      </div>
    {/* </div> */}
      {/* <div className="w-full relative overflow-hidden">
        <iframe
        className="w-screen aspect-video"
          src={`https://www.youtube.com/embed/${
          filterData?.key || "hXzcyx9V0xw"
        }?autoplay=1&mute=1&controls=0&loop=1&playlist=${
          filterData?.key || "hXzcyx9V0xw"
        }`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div> */}
    </>
  );
};

export default VideoContainer;
