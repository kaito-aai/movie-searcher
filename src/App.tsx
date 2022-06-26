import React, { useEffect, useState } from 'react';
import { Movie, MovieTile } from './components/MovieTile';
import './App.css';
import { searchMoviesWithWord, getPopularMovies } from './movie-fetcher';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");

  // mount時
  useEffect(() => {
    getPopularMovies().then(movies => {
      setMovies(movies);
    })
    return
  }, [])

  // 検索ワード変更時
  useEffect(() => {
    if (!searchWord) {
      // 検索ワードがないなら人気映画を表示
      getPopularMovies().then(movies => {
        setMovies(movies);
      });
      return
    }
    searchMoviesWithWord(searchWord).then(movies => {
      setMovies(movies)
      return
    })
  }, [searchWord])

  const onSearchInputChanged = (event: any) => {
    setSearchWord(event.target.value);
  }

  return (
    <div className="App">
      <input type="text" name="" id="" value={searchWord} onChange={onSearchInputChanged}/>
      {movies.map((movie, index) => {
        return <MovieTile key={index} {...movie}></MovieTile>
      })}
    </div>
  );
}

export default App;
