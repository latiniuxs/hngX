import axios from 'axios';
const API_KEY = import.meta.env.VITE_SOME_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';
export const fetchTopMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error fetching top movies:', error);
    throw error;
  }
};
export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        language: 'en-US',
        page: 1,
      },
    });

    return response.data.results; 
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const fetchMovieTrailer = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });

    if (response.data.results.length > 0) {
      const trailer = response.data.results.find((video) => video.type === 'Trailer');

      if (trailer) {
        if (trailer.site === 'YouTube') {
          return `https://www.youtube.com/watch?v=${trailer.key}`;
        }
        // Handle other video hosting sites if necessary
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching movie trailer:', error);
    throw error;
  }
};