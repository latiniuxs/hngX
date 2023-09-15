import { useState } from "react";
import favoriteIcon from '../assets/Favorite.svg';
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, release_date } = movie;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };



  return (
    <Link to={`/movies/${id}`} data-testid="movie-card">
      <div className="relative bg-white rounded-lg shadow-lg cursor-pointer mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <div className=" h-96 relative">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div
            className="absolute top-2 right-2"
          >
            <img
              src={favoriteIcon}
              className={` ${isFavorite ? "bg-red-500 rounded-full" : ""}`}
              alt={`Favorite Icon for ${title}`}
              onClick={toggleFavorite}
            />
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-sm truncate" data-testid="movie-release-date">
            {release_date}
          </p>
          <h2 className="text-lg font-semibold truncate" data-testid="movie-title">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
