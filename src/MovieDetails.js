import React from 'react';
import { useParams } from 'react-router-dom';
import moviesData from './movies.json'; // Import the JSON file

function MovieDetails() {
    const { title } = useParams();
    const movie = moviesData.find(movie => movie.title === title);

    if (!movie) {
        return <h2>Movie not found</h2>;
    }

    return (
        <div className="movie-details">
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <iframe 
                width="560" 
                height="315" 
                src={movie.trailerURL} 
                title="Trailer" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default MovieDetails;