import axios from "axios"
import { Movie } from "./components/MovieTile";
import { API_KEY, MOVIE_API_URL, MOVIE_IMAGE_URL } from "./keys/TMDB-api-keys";
import { getCurrentLang } from './i18n';

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
const lang = getCurrentLang();

export const getPopularMovies = (page: number): Promise<Movie[]> => {
    console.log(`called with page: ${page}`)
    return axios.get(`${MOVIE_API_URL}movie/popular?api_key=${API_KEY}&page=${page}&language=${lang}`)
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

export const searchMoviesWithWord = (word: string, page: number): Promise<Movie[]> => {
    const query = encodeURI(word);
    return axios.get(`${MOVIE_API_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=${lang}`)
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