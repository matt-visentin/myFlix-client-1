import PropTypes from "prop-types";
import { Row, Card, Col, Container, Card, CardGroup } from "react-bootstrap";

import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
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
                                <div>
                                    <button onClick={onBackClick}>Back</button>
                                </div>
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
