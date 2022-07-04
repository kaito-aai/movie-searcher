import React, { useEffect, useState } from 'react';
import { Movie, MovieTile } from './components/MovieTile';
import './App.css';
import appStyles from './app.module.scss';
import { searchMoviesWithWord, getPopularMovies } from './movie-fetcher';
import { useTranslation } from 'react-i18next';

type SearchMode = "popular" | "word";

function App() {
  const { t } = useTranslation();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [page, setPage] = useState(1);
  const [searchMode, setSearchMode] = useState<SearchMode>("popular");
  const [isScrolledBottom, setIsScrolledBottom] = useState(false);

  const handleScroll = () => {
    const isBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight;
    if (!isBottom) {
      setIsScrolledBottom(false);
      return
    }
    setIsScrolledBottom(true);
  }

  const resetSearchMode = (mode: SearchMode) => {
    if (searchMode === mode) {
      return;
    }
    setSearchMode(mode);
    setPage(1);
  }

  // bottomにスクロールしたとき
  useEffect(() => {
    if (!isScrolledBottom) {
      return;
    }

    setPage((prev) => {
      let p = prev + 1;

      let moviesPromise = new Promise<Movie[]>(() => { return [] });
      switch(searchMode) {
        case "popular":
          moviesPromise = getPopularMovies(p);
          break;
        case "word":
          moviesPromise = searchMoviesWithWord(searchWord, p);
          break;
        default:
          break;
      }

      moviesPromise.then(m => {
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
  }, [isScrolledBottom])

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
      resetSearchMode("popular");
      getPopularMovies(1).then(m => {
        setMovies(m);
      })
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
        <h1>{t('Title')}</h1>
        <input placeholder={t('SearchBoxPlaceholder')} type="text" name="" id="" value={searchWord} onChange={onSearchInputChanged}/>
      </div>
      <div className={appStyles.movies}>
        {movies.map((movie, index) => {
          return <MovieTile key={index} {...movie}></MovieTile>
        })}
      </div>
      {isScrolledBottom && "fetching more movies..."}
    </div>
  );
}

export default App;
