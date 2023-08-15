import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"



export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    
        return (

                <Row className="justify-content-md-center">
                    {!user ? (
                        <>
                            <Col md={5}>
                                <LoginView onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                    }}
                                />
                                or
                                <SignupView />
                            </Col>
                        </>
                    ) : selectedMovie ? (
                        <Col md={8}>
                            <MovieView 
                                movie={selectedMovie} 
                                onBackClick={() => setSelectedMovie(null)} 
                            />
                        </Col>
                    ) : movies.length === 0 ? (
                        <div>The list is empty!</div>
                    ) : (
                        <>
                            {movies.map((movie) => (
                                <Col key={movie._id} md={3}>
                                    <MovieCard
                                        movie={movie}
                                        onMovieClick={(newSelectedMovie) => {
                                            setSelectedMovie(newSelectedMovie);
                                        }}
                                    />
                                </Col>
                            ))}
                        </>
                    )}
                    <Button
                    variant="primary"
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.removeItem(user, token);
                    }}>
                        Logout
                </Button>
                </Row>


        );
};