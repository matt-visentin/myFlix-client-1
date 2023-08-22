import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Button, Card, CardGroup, Container } from "react-bootstrap";
import "./main-view.scss";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
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
            <Container>
                <Row className="justify-content-md-center" style={{border: "1px solid black"}}>
                    {!user ? (
                        <>
                        <Row>
                            <Col></Col>
                            <Col xs={10} md={8} lg={6} xxl={5}>
                                <LoginView onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                    }}
                                />
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col xs={10} md={8} lg={6} xxl={5}>
                                <SignupView />
                            </Col>
                            <Col></Col>
                        </Row>
                        </>
                    ) : selectedMovie ? (
                        <Col  md={8} lg={6} xl={5} xxl={4}>
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
                                <Col 
                                    key={movie._id}
                                    xs={12} md={6} lg={4} xxl={3}
                                    className="mt-3">
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
                    {( user &&
                        <Button
                        variant="primary"
                        onClick={() => {
                            setUser(null);
                            setToken(null);
                            localStorage.removeItem("user");
                            localStorage.removeItem("token");
                        }}>
                            Logout
                        </Button>
                    )}
                </Row>
            </Container>
        );
};