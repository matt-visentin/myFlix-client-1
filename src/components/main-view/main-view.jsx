import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }
        fetch("https://m-flix-816a8a9c4a76.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => movie);
            setMovies(moviesFromApi);
        });
    }, [token]);
    
    if (!user) {
        return (<LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}/>);
    }

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
            <button onClick={() => { setUser(null); setToken(null); }}>Logout</button>
        </div>
    );
};