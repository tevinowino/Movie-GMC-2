import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.title}`}>
        <h3>{movie.title}</h3>
      </Link>
      <p>Rating: {movie.rating}</p>
    </div>
  );
}

export default MovieCard;