import { getMovieVideo } from "@/API/TmdbApi";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const VideoContainer = ({ id, title, description }) => {
  const [filterData, setFilterData] = useState(null);

  const { data, isPending, error } = useQuery({
    queryKey: ["movieVid", id],
    queryFn: () => getMovieVideo(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  console.log(data);

  useEffect(() => {
    if (data?.data?.results.length) {
      let filterObj = data?.data?.results.filter(
        (item) =>
          item?.type == "Trailer" &&
          item.site === "YouTube" &&
          item?.name === "Official Trailer"
      );
      setFilterData(filterObj);
      console.log(filterObj);
    }
  }, [data]);

  if (filterData) {
    return (
      <div className="w-full h-screen relative overflow-hidden">
        {/* <iframe
          className="w-full h-full object-cover aspect-video"
          src={`https://www.youtube.com/embed/${filterData?.[0]?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${filterData?.[0]?.key}`}
          title="Trailer"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe> */}
        <iframe
          className="w-full h-full aspect-video w-screen"
          src="https://www.youtube.com/embed/hXzcyx9V0xw?si=zITgzjdmEbLZFxV2&autoplay=1&mute=1&controls=0&loop=1"
          title="YouTube video player"
          frameborder="0"
          allow="autoplay; fullscreen"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/90"></div>
        <div className="hidden lg:grid absolute inset-0 flex items-center text-white z-10 px-6 md:px-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold">{"Elemental"}</h1>
            <p className="max-w-lg mt-4 text-sm md:text-base">
              {
                "In a world where beings of fire, water, air, and earth exist, Ember Lumen (Leah Lewis) is a first generation fire elemental and daughter of immigrants"
              }
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default VideoContainer;
