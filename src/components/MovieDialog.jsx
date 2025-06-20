import { useQuery } from "@tanstack/react-query";
import React from "react";
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
import { getContentDetails } from "@/API/TmdbApi";
import { SquareX, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const MovieDialog = ({
  open = false,
  id = "",
  type = "",
  setOpen = () => {},
}) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["getMovieDetails", type, id],
    queryFn: () => getContentDetails(type, id),
    enabled: !!id && !!type,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] overflow-hidden border-0 p-0 pb-6 [&>button[aria-label=Close]]:hidden">
          {isPending ? (
            <Skeleton className="h-[200px] w-[425px] rounded-xl" />
          ) : (
            <div
              className="h-[200px] w-full bg-cover bg-center bg-no-repeat relative"
              style={{
                backgroundImage: `url(${imageURL}/${data?.data?.backdrop_path})`,
              }}
            >
              <div className="absolute  inset-0 z-20 hidden sm:flex items-center justify-start pl-8 bg-gradient-to-t from-black/50"></div>
            </div>
          )}

          <div className="px-6">
            <DialogHeader className={"[&>button[aria-label=Close]]:hidden"}>
              <DialogTitle className={"flex justify-between"}>
                {isPending ? (
                  <>
                    <Skeleton className="h-[20px] w-[360px] rounded-xl" />
                  </>
                ) : (
                  <>
                    {data?.data?.original_title || data?.data?.original_name}
                    <span className="text-sm">{data?.data?.release_date}</span>
                  </>
                )}
              </DialogTitle>
              <DialogDescription className={"mt-2 text-ellipsis"}>
                {isPending ? (
                  <>
                    <Skeleton className="h-[112px] w-[360px] rounded-xl" />
                  </>
                ) : (
                  <p className="mb-3 font-semibold text-sm">
                    {data?.data?.genres.map((item, idx) => {
                      return `${item.name} ${
                        idx != data?.data?.genres.length - 1 ? ", " : ""
                      }`;
                    })}
                  </p>
                )}

                {data?.data?.overview}
              </DialogDescription>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieDialog;
