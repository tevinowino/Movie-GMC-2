import React, { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard"; // Import MovieCard
import MovieList from "./components/MovieList";
import Filter from "./components/Filter";
import MovieDetails from "./MovieDetails"; // Import the new component
import moviesData from "./movies.json"; // Import the JSON file
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [rate, setRate] = useState("");
  const [newMovie, setNewMovie] = useState({ title: "", rating: "" }); // State for new movie input

  useEffect(() => {
    setMovies(moviesData); // Set the initial movies state from the JSON data
  }, []);

  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase()) &&
      (rate ? movie.rating >= rate : true)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie({ ...newMovie, [name]: value }); // Update newMovie state
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (newMovie.title && newMovie.rating) {
      // Check if title and rating are provided
      addMovie(newMovie); // Add the new movie
      setNewMovie({ title: "", rating: "" }); // Reset the input fields
    }
  };

  return (
    <BrowserRouter>
      <div className="app">
        <h1>Movie App</h1>
        {/* Form to add a new movie */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Movie Title"
            value={newMovie.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            value={newMovie.rating}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Add Movie</button>
        </form>

        <Filter
          title={title}
          rate={rate}
          setTitle={setTitle}
          setRate={setRate}
        />

        {/* Render Movie Cards directly in App.js */}
        <div className="movie-list">
            <MovieList movies={movies} />
          {/* {filteredMovies.map((movie) => (
            <MovieCard key={movie.title} movie={movie} /> // Render MovieCard for each filtered movie */}
          {/* ))} */}
        </div>

        <Routes>
          {/* Homepage Route */}
          <Route
            exact path="/"
            element={
              <div>
                <Filter
                  title={title}
                  rate={rate}
                  setTitle={setTitle}
                  setRate={setRate}
                />
                <MovieList movies={filteredMovies} />
              </div>
            }
          />

          {/* Movie Details Route */}
          <Route
            path="/movies/:title"
            element={<MovieDetails movies={movies} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
