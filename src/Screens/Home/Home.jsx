import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  return (
    <div className="w-full overflow-hidden relative p-6">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full px-4"
      >
        <CarouselContent className="flex gap-4">
          {Array.from({ length: 50 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-[50%] sm:basis-[20%] md:basis-1/6 lg:basis-1/6"
            >
              <div className="p-1">
                <Card className='py-0'>
                  <CardContent className="flex aspect-square items-center justify-center p-4">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Show arrows only on large screens (optional) */}
        {/* <div className="hidden md:flex"> */}
          <CarouselPrevious className='left-0' />
          <CarouselNext className='right-0' />
        {/* </div> */}
      </Carousel>
    </div>
  );
};

export default Home;
