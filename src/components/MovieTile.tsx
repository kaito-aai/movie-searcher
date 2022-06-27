export function MovieTile(movie: Movie) {
    const movieTileStyle = {
        width: "300px",
        border: "solid",
    }
    const titleStyle = {
        fontWeight: "bold",
        padding: "0 10px",
    }
    const descriptionStyle = {
        padding: "0 20px",
    }
    const imageStyle = {
        padding: "0 50px",
    }
    return (
        <div style={movieTileStyle}>
            <p style={titleStyle}>{movie.title}</p>
            <p style={descriptionStyle}>{movie.description}</p>
            <img style={imageStyle} src={movie.image} alt="" />
        </div>
    );
}

export interface Movie {
    title: string;
    description: string;
    image: string;
}