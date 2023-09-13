import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, release_date } = movie;

  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent the link from being triggered
    setIsFavorite(!isFavorite);
  };

  // Convert release_date to a UTC date string
  const releaseDateUTC = new Date(release_date).toLocaleDateString();

  return (
    <Link to={`/movies/${id}`} data-testid="movie-card">
      <div className="relative bg-white rounded-lg shadow-lg cursor-pointer mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <div className="w-full h-56 sm:h-64 md:h-72 lg:h-96 relative">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div
            className="absolute top-2 right-2 text-white cursor-pointer"
            onClick={toggleFavorite}
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={`text-xl ${isFavorite ? "fill-current" : ""}`}
            />
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-sm truncate" data-testid="movie-release-date">
            {releaseDateUTC}
          </p>
          <h2 className="text-lg font-semibold truncate" data-testid="movie-title">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};

// PropTypes and export
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
