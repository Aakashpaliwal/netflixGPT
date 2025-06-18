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
import { getTrendMovie } from "@/API/TmdbApi";
import Trending from "@/Screens/Trending/Trending";

const Home = () => {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["trendMovies"],
    queryFn: getTrendMovie,
    refetchOnWindowFocus: false
  });

  console.log(data);
  console.log(error);
  console.log(isPending);
  console.log(isError);

  return (
    // <div className="w-full overflow-hidden relative p-6">
    //   <Carousel
    //     opts={{
    //       align: "start",
    //     }}
    //     className="w-full px-4"
    //   >
    //     <CarouselContent className="flex gap-4">
    //       {Array.from({ length: 50 }).map((_, index) => (
    //         <CarouselItem
    //           key={index}
    //           className="basis-[50%] sm:basis-[20%] md:basis-1/6 lg:basis-1/6"
    //         >
    //           <div className="p-1">
    //             <Card className='py-0'>
    //               <CardContent className="flex aspect-square items-center justify-center p-4">
    //                 <span className="text-2xl font-semibold">{index + 1}</span>
    //               </CardContent>
    //             </Card>
    //           </div>
    //         </CarouselItem>
    //       ))}
    //     </CarouselContent>
    //       <CarouselPrevious className='left-0' />
    //       <CarouselNext className='right-0' />
    //   </Carousel>
    // </div>
    <Trending data={data} loading={isPending} error={error} />
  );
};

export default Home;
