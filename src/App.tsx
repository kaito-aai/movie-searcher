import React, { useEffect, useState } from 'react';
import { Movie, MovieTile } from './components/MovieTile';
import './App.css';
import { getPopularMovies } from './movie-fetcher';

function App() {
  const [movies, setMovie] = useState<Movie[]>([])

  useEffect(() => {
    getPopularMovies().then(v => {
      setMovie(v);
    })
  }, [])

  return (
    <div className="App">
      {movies.map((movie, index) => {
        return <MovieTile key={index} {...movie}></MovieTile>
      })}
    </div>
  );
}

export default App;
