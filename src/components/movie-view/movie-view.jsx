import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
    console.log(movie);
    return (
        <div>
            <div>
            <img src={movie.imagePath} alt="Movie Cover" />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.name}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <button onClick={onBackClick}>Back</button>
            </div>
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        }),
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birthyear: PropTypes.number
        }),
        description: PropTypes.string.isRequired,
        imagePath: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
