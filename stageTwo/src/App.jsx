import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MovieDetails from "./components/MovieDetails";
import PageNotFound from "./components/PageNotFound";
import "./index.css";
import "tailwindcss/tailwind.css";

function App() {
  const [isError, setIsError] = useState(false); // Shared state for error
  const [errorMessage, setErrorMessage] = useState(null); // Shared state for error message

  return (
    <Router>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/"
          element={
            <HomePage
              isError={isError}
              errorMessage={errorMessage}
              setIsError={setIsError}
              setErrorMessage={setErrorMessage}
            />
          }
        />
        <Route
          path="/movies/:id"
          element={
            <MovieDetails
              isError={isError}
              errorMessage={errorMessage}
              setIsError={setIsError}
              setErrorMessage={setErrorMessage}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
