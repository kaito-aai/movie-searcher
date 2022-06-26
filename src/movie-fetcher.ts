import axios from "axios"
import { Movie } from "./components/MovieTile";
import { API_KEY, MOVIE_API_URL, MOVIE_IMAGE_URL } from "./keys/TMDB-api-keys";
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

export const getPopularMovies = (): Promise<Movie[]> => {
    return axios.get(`${MOVIE_API_URL}movie/popular?api_key=${API_KEY}`)
        .then(res => {
            const movies: Movie[] = [];
            res.data.results.forEach((movie: any) => {
                movies.push({ title: movie.title, description: movie.overview, image: MOVIE_IMAGE_URL+movie.poster_path })
            });
            return movies;
        })
        .catch(err => {
            throw err;
        })
}

export const searchMoviesWithWord = (word: string): Promise<Movie[]> => {
    const query = encodeURI(word);
    return axios.get(`${MOVIE_API_URL}search/movie?api_key=${API_KEY}&query=${query}`)
        .then(res => {
            const movies: Movie[] = [];
            res.data.results.forEach((movie: any) => {
                movies.push({ title: movie.title, description: movie.overview, image: MOVIE_IMAGE_URL+movie.poster_path })
            });
            return movies;
        })
        .catch(err => {
            throw err;
        })
}