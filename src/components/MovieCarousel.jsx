import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import MovieCard from "./MovieCard";

const MovieCarousel = ({ 
  title, 
  data, 
  loading, 
  error, 
  className = "",
  showArrows = true 
}) => {
  if (loading) {
    return (
      <div className={`w-full overflow-hidden relative p-6 ${className}`}>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pl-10 mb-3">
          {title}
        </h4>
        <div className="flex gap-4 px-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-[300px] w-[200px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full overflow-hidden relative p-6 ${className}`}>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pl-10 mb-3">
          {title}
        </h4>
        <div className="px-4 text-center text-gray-500">
          Failed to load {title.toLowerCase()}
        </div>
      </div>
    );
  }

  if (!data?.data?.results?.length) {
    return (
      <div className={`w-full overflow-hidden relative p-6 ${className}`}>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pl-10 mb-3">
          {title}
        </h4>
        <div className="px-4 text-center text-gray-500">
          No {title.toLowerCase()} available
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden relative pt-6 ${className}`}>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pl-10 mb-3">
        {title}
      </h4>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full px-4"
      >
        <CarouselContent className="flex gap-4">
          {data.data.results.map((item) => (
            <CarouselItem
              key={item?.id}
              className="basis-[50%] sm:basis-[40%] md:basis-1/8 lg:basis-1/8"
            >
              <div className="p-1">
                <MovieCard movie={item} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showArrows && data && (
          <>
            <CarouselPrevious className="left-0 hover:cursor-pointer" />
            <CarouselNext className="right-0 hover:cursor-pointer" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default MovieCarousel; 