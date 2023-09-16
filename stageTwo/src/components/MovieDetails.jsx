import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/MovieServices";
import movieNavbar from "../assets/movieNavbar.svg";
import moreOption from "../assets/moreOption.svg";
import nomination from "../assets/nominations.svg";
import bestMovies from "../assets/bestMovies.svg";
import { BadRequest } from "./BadRequest";
import Loading from "./Loading";
import { Footer } from "./Footer";

const MovieDetails = ({
  isError,
  errorMessage,
  setErrorMessage,
  setIsError,
}) => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      fetchMovieDetails(id)
        .then((data) => {
          setMovieDetails(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setErrorMessage(`Error fetching movie details: , ${error.message}`);
          setIsLoading(false);
          setIsError(true);
        });
    }, 1000);
  }, [id, setErrorMessage, setIsError]);

  const utcReleaseYear = (release_date) => {
    const localDate = new Date(release_date);
    const year = localDate.getUTCFullYear();
    const month = (localDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = localDate.getUTCDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  

  return (
    <div className="movie-details">
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <BadRequest message={errorMessage} />
      ) : (
        <>
          <div className="flex justify-start">
            <img
              src={movieNavbar}
              alt="movie navbar"
              className="hidden h-[auto] lg:block"
            />
            <div className="p-3">
              <img
                src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
                className="rounded-lg w-[100%]"
                alt={`${movieDetails.title} image`}
              />
              <div className="flex flex-col text-sm md:text-base text-gray-600  md:flex-row mt-10">
                <h1 data-tesid="movie-title">{movieDetails.title}</h1>
                <span>Release Date:</span><h3 data-testid="movie-release-date" className="md:mr-2">
                  {utcReleaseYear(movieDetails.release_date)}
                </h3><span>Runtime: </span>
                <p data-testid="movie-runtime">{movieDetails.runtime}</p>
                <span>minutes</span>
              </div>
              <div className="flex flex-col md:flex-row">
                <p data-testid="movie-overview" className="mt-12 md:w-[62%]">
                  {movieDetails.overview}
                </p>
                <img
                  src={moreOption}
                  alt="movie options"
                  className="w-100vw md:w-[42.5%]"
                />
              </div>
              <div className="flex flex-col md:flex-row mt-6">
                <div className="md:w-[62%] mr-3">
                  <p>Director : {}</p>
                  <p className="my-8">writers: {}</p>
                  <p className="mb-8">Stars: {}</p>
                  <img
                    className="w-[100vw]"
                    src={nomination}
                    alt="movie nominations"
                  />
                </div>
                <div>
                  <img
                    src={bestMovies}
                    alt="best movies"
                    className="w-[100vw] md:[w-82.5%]"
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default MovieDetails;
