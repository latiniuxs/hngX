import { useEffect, useState } from "react";
import { MovieSearch } from "./MovieSearch";
import tomatoes from "../assets/PngItem_1381056 1.svg";
import PlayButton from "../assets/Play.svg";
import imdb from "../assets/imdb.svg";

export const Poster = ({ movie, handleSearch }) => {
  const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    if (movie && movie.length > 0) {
      const randomIndex = Math.floor(Math.random() * movie.length);
      setRandomMovie(movie[randomIndex]);
    }
  }, [movie]);

  return (
    <div className="landing-page">
      {randomMovie && (
        <div
      className="h-[75vh] bg-no-repeat bg-center lg:px-20"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${randomMovie.poster_path})`,
            backgroundSize: 'cover',
          }}
        >
          <div className="overlay">
            <MovieSearch handleSearch={handleSearch} />
            <div className="w-[100%] h-[285px] top-158 p-2 left-98 gap-16 mt-[4rem] text-white">
              <h1 className="font-dm-sans text-5xl font-bold leading-56 tracking-normal text-left text-white">
                {randomMovie.title}
              </h1>
              <div className="w-[184px] flex md:pt-3 my-3">
                <div className="flex items-center justify-center text-xs">
                  <img src={imdb} alt="Imdb logo" className="mr-2" />
                  <p>{randomMovie.vote_average}/10</p>
                </div>
                <div className=" items-center justify-center text-xs flex ml-5 md:ml-10">
                  <img src={tomatoes} alt="rottentomatoes" className="mr-2" />
                  <p>{randomMovie.vote_count}</p>
                </div>
              </div>
              <p className="w-[302px] h-auto text-xs">{randomMovie.overview}</p>
              <button className="flex bg-rose-700 py-2 my-2 px-3 rounded-lg md:mt-5 hover:text-rose-700 hover:bg-white">
                <img src={PlayButton} alt="watch trailer" />
                WATCH TRAILER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
