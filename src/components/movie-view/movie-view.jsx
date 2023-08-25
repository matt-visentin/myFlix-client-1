import React from "react";
import PropTypes from "prop-types";
import { Row, Card, Col, Container, Card, CardGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { _id } = useParams();
    const movie = movies.find((m) => m._id === _id)
    console.log(movie);
    return (
        <CardGroup>
            <Card>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Body>
                <div>
                    <div>
                    <img src={movie.ImagePath} className="mw-100" alt="Movie Cover" />
                    </div>
                    <div>
                        <span>Director: </span>
                        <span>{movie.Director.Name}</span>
                    </div>
                    <div>
                        <span>Genre: </span>
                        <span>{movie.Genre.Name}</span>
                    </div>
                    <div>
                        <span>Description: </span>
                        <span>{movie.Description}</span>
                    </div>
                    <Link to={`/`}>
                        <button className="back-button">Back</button>
                    </Link>
                </div>
                </Card.Body>
            </Card>
        </CardGroup>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string
        }),
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
