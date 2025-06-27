import axiosInstance from "@/API/interceptor";
import MovieCard from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import { XIcon } from "lucide-react";
import OpenAI from "openai";
import React, { useState } from "react";

const Recommendation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [allMovies, setAllMovies] = useState(null);

  const getMovieDetailsByTmdb = async (title) => {
    const result = await axiosInstance.get(`/search/movie?query=${title}`);
    return result?.data?.results;
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const client = new OpenAI({
      apiKey: import.meta.env.VITE_CHATGPT_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    const gptQuery =
      "Act as movie recommendation system and suggest some movies for the query: " +
      searchQuery +
      ". Only give me name of top 10 movies in a comma seperated string just like examples ahead. Examples: Golmal, Andaz Apna Apna, The Hangover, Freee Guy, Dhol.";

    const response = await await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "developer", content: gptQuery }],
    });

    const movieTitle =
      response?.choices?.[0]?.message?.content.split(", ") ?? [];

    const movieDetailResult = await Promise.all(
      movieTitle.map((title) => getMovieDetailsByTmdb(title))
    );
    setLoading(false);
    let movieData = movieDetailResult?.flatMap((item) => item);
    setAllMovies(movieData);
  };

  return (
    <>
      <div className="mt-3 p-6">
        <form
          onSubmit={handleSearchSubmit}
          className="flex h-12 items-center w-full justify-between gap-2 bg-zinc-800 rounded px-3 py-1"
        >
          <input
            type="text"
            a
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Retro, Comedy Movies..."
            className="bg-transparent text-white outline-none w-full"
          />
          <XIcon
            size={18}
            className="cursor-pointer text-gray-400 hover:text-white"
            onClick={() => {
              setSearchQuery("");
            }}
          />
        </form>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-4">
          {loading && (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-[340px] w-[230px] rounded-xl" />
              ))}
            </>
          )}
          {allMovies?.map((item) => {
            return (
              <MovieCard
                key={item.id}
                movie={item}
                id={item.id}
                type={"movie"}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Recommendation;
