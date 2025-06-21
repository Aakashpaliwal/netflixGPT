import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { imageURL } from "@/constant/constant";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getContentDetails } from "@/API/TmdbApi";
import { SquareX, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import MovieDialog from "@/components/MovieDialog";

const MovieCard = ({  movie, id = "", type = "" }) => {
  const [open, setOpen] = useState(false);
  const [selectMovieId, setSelectMovieId] = useState(null);
  const [contentType, setContentType] = useState(null);
  return (
    <>
      <div key={movie?.id}>
        <Card
          className={`py-0 border-0`}
          onClick={() => {
            setOpen(!open);
            setSelectMovieId(id);
            setContentType(type);
          }}
        >
          <div className="aspect-[2/3] w-full overflow-hidden relative rounded-lg group cursor-pointer transition-transform duration-300 hover:scale-105">
            <img
              src={`${imageURL}/${movie?.poster_path || movie?.backdrop_path}`}
              alt={movie?.title || movie?.name}
              // loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0   group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
              <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold text-sm truncate">
                  {movie?.title || movie?.name}
                </h3>
                <p className="text-xs text-gray-300">
                  {movie?.release_date?.split("-")[0] ||
                    movie?.first_air_date?.split("-")[0]}
                </p>
              </div>
            </div>
          </div>
        </Card>
        {open && (
          <MovieDialog
            open={open}
            id={selectMovieId}
            type={contentType}
            setOpen={setOpen}
          />
        )}
      </div>
    </>
  );
};

export default MovieCard;
