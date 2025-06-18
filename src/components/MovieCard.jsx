import React from "react";
import { Card } from "@/components/ui/card";
import { imageURL } from "@/constant/constant";

const MovieCard = ({ movie, className = "" }) => {
  return (
    <Card className={`py-0 ${className} border-0`}>
      <div className="aspect-[2/3] w-full overflow-hidden relative rounded-lg group cursor-pointer transition-transform duration-300 hover:scale-105">
        <img
          src={`${imageURL}/${movie?.poster_path}`}
          alt={movie?.title || movie?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0   group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
          <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="font-semibold text-sm truncate">
              {movie?.title || movie?.name}
            </h3>
            <p className="text-xs text-gray-300">
              {movie?.release_date?.split('-')[0] || movie?.first_air_date?.split('-')[0]}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard; 