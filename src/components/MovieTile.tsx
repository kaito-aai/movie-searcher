export function MovieTile(movie: Movie) {
    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <img src={movie.image} alt="" />
        </div>
    );
}

export interface Movie {
    title: string;
    description: string;
    image: string;
}