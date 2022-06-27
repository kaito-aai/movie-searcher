import movieTileStyles from "./movieTile.module.scss";

export function MovieTile(movie: Movie) {
    return (
        <div className={movieTileStyles.movieTile}>
            <p className={movieTileStyles.title}>{movie.title}</p>
            <p className={movieTileStyles.description}>{movie.description}</p>
            <img className={movieTileStyles.image} src={movie.image} alt="" />
        </div>
    );
}

export interface Movie {
    title: string;
    description: string;
    image: string;
}