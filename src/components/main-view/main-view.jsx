import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('https://m-flix-816a8a9c4a76.herokuapp.com/movies')
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    image: movie.ImagePath,
                    id: movie._id,
                    title: movie.Title,
                    image: movie.ImagePath,
                    description: movie.Description,
                    actors: movie.Actors,
                    genre: {
                        name: movie.Genre.Name,
                        description: movie.Genre.Description,
                    },
                    director: {
                        name: movie.Director.Name,
                        bio: movie.Director.Bio,
                        birth: movie.Director.Birthday,
                    },
                };
            });
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
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
 };