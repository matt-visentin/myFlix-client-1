import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('https://m-flix-816a8a9c4a76.herokuapp.com/movies')
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => movie);
        setMovies(moviesFromApi);
        });
    }, []);
    
    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
      return (
        <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
        />
      );
    }

    if (movies.length === 0) {
        return <div>The list is empty</div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
 };