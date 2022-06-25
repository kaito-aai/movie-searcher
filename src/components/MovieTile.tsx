export function MovieTile(movie: Movie) {
    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
        </div>
    );
}

export interface Movie {
    title: string;
    description: string;
}