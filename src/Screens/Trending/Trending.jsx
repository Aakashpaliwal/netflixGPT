import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { imageURL } from "@/constant/constant";

const Trending = ({ data, loading, error }) => {
  console.log(data);
  return (
    <div className="w-full overflow-hidden relative p-6">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full px-4"
      >
        <CarouselContent className="flex gap-4">
          {data?.data?.results.map((item, idx) => {
            return (
              <CarouselItem
                key={item?.id}
                className="basis-[50%] sm:basis-[20%] md:basis-1/6 lg:basis-1/6"
              >
                <div className="p-1">
                  <Card className="py-0">
                    <CardContent
                      className="aspect-square bg-cover bg-center relative p-4"
                      style={{
                        backgroundImage: `url(${imageURL}/${item?.poster_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-sm font-semibold p-2 rounded">
                        {item?.title}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Show arrows only on large screens (optional) */}
        {/* <div className="hidden md:flex"> */}
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
        {/* </div> */}
      </Carousel>
    </div>
  );
};

export default Trending;
