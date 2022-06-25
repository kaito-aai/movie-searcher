import React from 'react';
import { Movie, MovieTile } from './components/MovieTile';
import './App.css';

function App() {
  const movies: Movie[] = [
    { title: "The Matrix", description: "action movie" },
    { title: "The Shining", description: "horror movie" },
    { title: "Home Alone", description: "funny movie" },
  ]

  return (
    <div className="App">
      {movies.map((movie, index) => {
        return <MovieTile  key={index} {...movie}></MovieTile>
      })}
    </div>
  );
}

export default App;
