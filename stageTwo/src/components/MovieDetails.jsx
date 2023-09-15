import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/MovieServices";
import movieNavbar from "../assets/movieNavbar.svg";
import moreOption from "../assets/moreOption.svg";
import nomination from "../assets/nominations.svg";
import bestMovies from "../assets/bestMovies.svg";
import { BadRequest } from "./BadRequest";
import Loading from "./Loading";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    setTimeout(() => {
      fetchMovieDetails(id)
        .then((data) => {
          setMovieDetails(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(`Error fetching movie details: , ${error.message}`);
          setIsLoading(false);
        });
    }, 1000);
  }, [id]);

  return (
    <div className="movie-details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
        {error && <BadRequest message={error} />}
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
                <h1>{movieDetails.title}</h1>
                <p className="md:mx-2">Release Date: {new Date(movieDetails.release_date).toDateString()}</p>
                <p>Runtime: {movieDetails.runtime} minutes</p>
              </div>
              <div className="flex flex-col md:flex-row">
                <p className="mt-12 md:w-[62%]"> {movieDetails.overview}</p>
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
                  <img className="w-[100vw]" src={nomination} alt="movie nominations" />
                </div>
                <div>
                  <img src={bestMovies} alt="best movies" className="w-[100vw] md:[w-82.5%]" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
