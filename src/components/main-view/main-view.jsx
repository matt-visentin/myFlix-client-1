import { useEffect, useState } from "react";
import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Button, Card, CardGroup, Container, Nav } from "react-bootstrap";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./main-view.scss";

export const MainView = () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    
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
        <BrowserRouter>
            <Container className="bg-primary">
                <Row className="justify-content-md-center pb-3 bg-primary">
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                <>
                                {!user ? (
                                    <Navigate to="/" />
                                    ) : (
                                        <Row>
                                            <Col></Col>
                                            <Col xs={10} md={8} lg={6} xxl={5}>
                                                <SignupView />
                                            </Col>
                                            <Col></Col>
                                        </Row>
                                    )}
                                </>
                            }/>
                        <Route
                            path="/login"
                            element={
                                <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
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
                                )}
                                </>
                            }
                        />
                        <Route
                            path="/movies/:_id"
                            element={
                                <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty</Col>
                                ) : (
                                    <Col md={8} lg={6} xl={5} xxl={4}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                                </>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty</Col>
                                ) : (
                                    <>
                                    {movies.map((movie) => (
                                        <Col 
                                            key={movie._id}
                                            xs={12} md={6} lg={4} xxl={3}
                                            className="mt-3">
                                                <MovieCard
                                                    movie={movie} />
                                        </Col>
                                    ))}
                                    </>
                                )}
                                </>
                            }
                        />        
                    </Routes>
                </Row>
            </Container>
        </BrowserRouter>
    );
};