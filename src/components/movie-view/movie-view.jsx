import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
    console.log(movie);
    return (
        <div>
            <div>
                <img src={movie.image} />
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
        Title: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birthyear: PropTypes.number
        }),
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};
