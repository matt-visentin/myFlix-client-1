import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Marriage Story",
            description: "Noah Baumbach's incisive and compassionate look at a marriage breaking up and a family staying together.",
            genre: "Drama",
            image:
              "https://assets.scriptslug.com/live/img/posters/marriage-story-2019.jpg",
            director: "Noah Baumbach"
        },
        {
            id: 2,
            title: "Memento",
            description: "A man with short-term memory loss attempts to track down his wife's murderer.",
            genre: "Thriller",
            image:
              "https://images.squarespace-cdn.com/content/v1/58acc880e4fcb5dd237922fc/1551358270358-Z6FPC1OVBAWHVT0GKCA8/image-asset.jpeg",
            director: "Christopher Nolan"
        },
        {
            id: 3,
            title: "The Hand of God",
            description: "In 1980s Naples, young Fabietto pursues his love for football as family tragedy strikes, shaping his uncertain but promising future as a filmmaker.",
            genre: "Drama",
            image:
              "https://mr.comingsoon.it/imgdb/locandine/big/58940.jpg",
            director: "Paolo Sorrentino"
        }
    ]);

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