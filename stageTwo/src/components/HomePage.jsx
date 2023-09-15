import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { fetchTopMovies } from "../services/MovieServices";
import { Poster } from "./Poster";
import { Footer } from "./Footer";
import Chevron_right from "../assets/Chevron_right.svg";
import { BadRequest } from "./BadRequest";
import Loading from "./Loading";

const HomePage = ({ isError, errorMessage, setIsError, setErrorMessage }) => {
  const [topMovies, setTopMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      // Fetch top movies from TMDB API and update state
      fetchTopMovies()
        .then((data) => {
          setTopMovies(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setIsLoading(false);
          setIsError(true);
        });
    }, 1000);
  }, [setErrorMessage, setIsError]);

  const handleSearch = (query) => {
    setIsLoading(true);
    setTimeout(() => {
      setTopMovies(query);
      setIsLoading(false);
    }, 1000); 
  };
  

  return (
    <div className="home-page">
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <BadRequest message={errorMessage} />
      ) : (
        <>
          <Poster movie={topMovies} handleSearch={handleSearch} />
          <div className="lg:m-[4rem] md:4rem">
            <div className="flex flex-row items-center px-5 justify-between my-3 md:my-10">
              <p className="text-black font-dm-sans lg:ml-2 md:text-3xl lg:text-4xl font-bold leading-48 whitespace-nowrap">
                Featured Movie
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-[#B91C1C] text-sm md:text-base lg:text-sm whitespace-nowrap">
                  see more
                </p>
                <img
                  src={Chevron_right}
                  alt="chevron Right"
                  className="h-4 w-4 md:h-5 md:w-5 lg:h-4 lg:w-4"
                />
              </div>
            </div>

            {isLoading ? (
              <Loading /> // Display loading page while fetching data
            ) : (
              <div className="grid lg:grid-cols-4 md:gap-10 md:grid-cols-3 sm:gap-5 sm:grid-cols-2 px-5 lg:mx-3 lg:gap-12">
                {topMovies &&
                  topMovies
                    .filter((movie) => movie.poster_path !== null)
                    .slice(0, 10)
                    .map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
              </div>
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomePage;
