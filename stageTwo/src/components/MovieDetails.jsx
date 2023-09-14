import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../services/MovieServices";
import movieNavbar from "../assets/movieNavbar.svg";
const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    fetchMovieDetails(id)
      .then((data) => setMovieDetails(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);
  console.log(movieDetails);
  // if (!movieDetails) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="movie-details">
      <div className="flex">
        <img
          src={movieNavbar}
          alt="movie navbar"
          className="hidden sm:block lg:block md:block"
        />
        <div className="p-2">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`}
            className=" rounded-lg w-[100%]  "
            alt={`${movieDetails.title} image`}
          />
          <div className="flex">
            <h1>{movieDetails.title}</h1>
            <p>Release Date: {movieDetails.release_date}</p>
            <p>Runtime: {movieDetails.runtime} minutes</p>
          </div>
          <p>{movieDetails.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
