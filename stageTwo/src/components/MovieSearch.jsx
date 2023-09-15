import { useState } from "react";
// import MovieCard from "./MovieCard";
//assets import
import { searchMovies } from "../services/MovieServices";
import Logo from "../assets/Logo.svg";
import hamburger from "../assets/Menu.svg";
import searchIcon from "../assets/Search.svg";

export const MovieSearch = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const searchMoviesAndSetResults = (e) => {
    e.preventDefault()
    searchMovies(query)
      .then((data) => handleSearch(data))
      .catch((error) => console.error("Error searching movies:", error));

  };

  return (
    <nav className="flex items-center justify-between p-2 text-white">
      <img src={Logo}  alt="LogoImage"></img>
        <form  className="flex md:flex-row border-2 border-white rounded-md justify-between w-full md:w-[50%] lg:w-[40%] px-2 md:px-1 items-center" onSubmit={searchMoviesAndSetResults}>
        <input
          type="text"
          placeholder="What do you want to watch?"
          value={query}
          className="bg-transparent opacity-75 mx-2 md:mx-4 font-normal w-full md:w-3/4 lg:w-4/5 placeholder-white text-sm focus:outline-none focus:border-none focus:ring-0"
          onChange={(e) => setQuery(e.target.value)}
        />
          <img className="ml-2 md:ml-4" onClick={searchMoviesAndSetResults} src={searchIcon} alt="searchIcon" />
        </form>

      <div className="hidden md:flex items-center">
        <h5 className="mr-5">Sign in</h5>
        <img src={hamburger} alt="hamburger menu" />
      </div>
    </nav>
  );
};
