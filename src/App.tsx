import React, { useEffect, useState } from 'react';
import { Movie, MovieTile } from './components/MovieTile';
import './App.css';
import appStyles from './app.module.scss';
import { searchMoviesWithWord, getPopularMovies } from './movie-fetcher';

type SearchMode = "popular" | "word";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [page, setPage] = useState(1);
  const [searchMode, setSearchMode] = useState<SearchMode>("popular");

  const handleScroll = () => {
    const isBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight;
    if (!isBottom) {
      return
    }

    switch(searchMode) {
      case "popular":
        setPage((prev) => {
          let p = prev + 1;
          getPopularMovies(p).then(m => {
            setMovies((prevMovie) => {
              let found: Movie | undefined;
              prevMovie.forEach((movie) => {
                found = m.find(m => m.title == movie.title);
              })
              if (found) {
                return prevMovie;
              }
              return [...prevMovie, ...m]
            });
          });
          return p;
        });
        return;
      case "word":
        setPage((prev) => {
          let p = prev + 1;
          searchMoviesWithWord(searchWord, p).then(m => {
            setMovies((prevMovie) => {
              let found: Movie | undefined;
              prevMovie.forEach((movie) => {
                found = m.find(m => m.title == movie.title);
              })
              if (found) {
                return prevMovie;
              }
              return [...prevMovie, ...m]
            });
          });
          return p;
        });
        return;
      default:
        break;
    }
  }

  const resetSearchMode = (mode: SearchMode) => {
    if (searchMode === mode) {
      return;
    }
    console.log("reset");
    setSearchMode(mode);
    setPage(1);
  }

  useEffect(() => {

  }, )

  // mount時
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    resetSearchMode("popular");
    getPopularMovies(1).then(m => {
      setMovies(m);
    })

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  // 検索ワード変更時
  useEffect(() => {
    if (!searchWord) {
      return
    }
    resetSearchMode("word");
    searchMoviesWithWord(searchWord, 1).then(m => {
      setMovies(m);
      return
    })
  }, [searchWord])

  const onSearchInputChanged = (event: any) => {
    setSearchWord(event.target.value);
  }

  return (
    <div className="App">
      <div className={appStyles.header}>
        <h1>Movie Searcher</h1>
        <input placeholder='Enter word' type="text" name="" id="" value={searchWord} onChange={onSearchInputChanged}/>
      </div>
      <div className={appStyles.movies}>
        {movies.map((movie, index) => {
          return <MovieTile key={index} {...movie}></MovieTile>
        })}
      </div>
    </div>
  );
}

export default App;
