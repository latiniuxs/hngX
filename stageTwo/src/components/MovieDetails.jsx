import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/MovieServices';

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id)
      .then((data) => setMovieDetails(data))
      .catch((error) => console.error('Error fetching movie details:', error));
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h1>{movieDetails.title}</h1>
      <p>Release Date: {movieDetails.release_date}</p>
      <p>Runtime: {movieDetails.runtime} minutes</p>
      <p>{movieDetails.overview}</p>
    </div>
  );
};

export default MovieDetails;