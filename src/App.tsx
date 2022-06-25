import React from 'react';
import { Movie, MovieTile } from './components/MovieTile';
import './App.css';

function App() {
  const sampleMovie: Movie = { title: "sample movie", description: "most famous action movie." };

  return (
    <div className="App">
      <MovieTile {...sampleMovie}></MovieTile>
    </div>
  );
}

export default App;
